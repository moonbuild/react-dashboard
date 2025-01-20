// filepath: /d:/Multi Language DashBoard/react-dashboard/src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StyledEngineProvider } from "@mui/material/styles";
import Dashboard from './Dashboard.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <Dashboard />
        </I18nextProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  </StrictMode>
);