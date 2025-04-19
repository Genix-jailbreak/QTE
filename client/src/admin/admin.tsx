import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminApp from './AdminApp';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/admin">
        <AdminAuthProvider>
          <AdminApp />
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);