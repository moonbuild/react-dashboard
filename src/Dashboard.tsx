import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Stack, Typography, createTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import AgeLineChart from './AgeLineChart';
import GenderPieChart from './GenderPieChart';
import RolePieChart from './RolePieChart';
import DepartmentBarChart from './DepartmentBarChart';
import PostsTable from './PostsTable';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './i18nData/LanguageSelector';
import ChatIcon from '@mui/icons-material/Chat';

function ToolbarActionsSearch() {
  return (
    <Stack direction="row"spacing={2}>
      <LanguageSelector/>
       
      <ThemeSwitcher />
    </Stack>
  );
}
function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
    </Box>
  );
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;
  const { t, i18n } = useTranslation();

  const NAVIGATION: Navigation = [
    {
      segment: 'dashboard',
      title: t('sidebar-dashboard'), 
      icon: <DashboardIcon />,
    },
    {
      segment: 'posts',
      title: t('sidebar-posts'), 
      icon: <ChatIcon />,
    },
  ];
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        // logo: <img src="./assets/logo.svg" alt="logo" />,
        title: 'Temar',
        homeUrl: '/home',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout slots={{ toolbarActions: ToolbarActionsSearch }}>
        {
          (router.pathname === '/dashboard' || router.pathname === '/home') && (
            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Box sx={{ width: '90%', mb: 4 }}>
                <AgeLineChart />
              </Box>

              <Box sx={{ width: '90%', display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Box sx={{ width: '45%' }}>
                  <GenderPieChart />
                </Box>
                <Box sx={{ width: '45%' }}>
                  <RolePieChart />
                </Box>
              </Box>

              <Box sx={{ width: '90%' }}>
                <DepartmentBarChart />
              </Box>
            </Box>
          )
        }
        {(router.pathname === '/posts') && (
          <PostsTable />
        )}
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
    </AppProvider>
  );
}
