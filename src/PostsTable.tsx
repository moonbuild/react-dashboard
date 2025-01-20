import { useEffect } from "react";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert, CircularProgress, Box } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Post } from "./types/Posts";
import { useTranslation } from "react-i18next";

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    position: 'sticky',
    top: 0,
    zIndex: 2,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const fetchTableData = async (page: number): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export default function PostsTable() {
  const { ref, inView } = useInView();
  const { t } = useTranslation();

  const fetchMoreData = async ({ pageParam = 1 }: { pageParam?: number }): Promise<Post[]> => {
    return fetchTableData(pageParam);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchMoreData,
    getNextPageParam: (lastPage, allPages) => (lastPage.length > 0 ? allPages.length + 1 : undefined),
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Typography align="center" sx={{ my: 4 }}>
        <CircularProgress />
        <span> {t("Loading data...")}</span>
      </Typography>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Alert>
    );
  }

  const isEmpty = data?.pages.length === 0;

  return (
    <Box sx={{ 
      height: 'calc(100vh - 32px)',
      p: 2,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TableContainer 
        component={Paper} 
        sx={{ 
          flexGrow: 1,
          boxShadow: 3, 
          borderRadius: 2,
          overflow: 'auto'
        }}
      >
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{t("posts-col-id")}</StyledTableCell>
              <StyledTableCell>{t("posts-col-title")}</StyledTableCell>
              <StyledTableCell align="center">{t("posts-col-body")}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEmpty ? (
              data?.pages.flatMap((page) =>
                page.map((post) => (
                  <StyledTableRow key={post.id}>
                    <StyledTableCell align="justify">{post.id}</StyledTableCell>
                    <StyledTableCell>{post.title}</StyledTableCell>
                    <StyledTableCell align="justify">{post.body}</StyledTableCell>
                  </StyledTableRow>
                ))
              )
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={3} align="center">
                  <Typography variant="body1" color="textSecondary">
                    {t("No data available")}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}

            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                <div ref={ref}>
                  {isFetchingNextPage && <CircularProgress size={24} />}
                  {!hasNextPage && !isEmpty && (
                    <Typography variant="body2" color="textSecondary">
                      {t("No more data to load.")}
                    </Typography>
                  )}
                </div>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}