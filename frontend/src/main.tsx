import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import AppProvider from './context/AppProvider.tsx';
import { APICacheProvider } from './context/APICacheContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <APICacheProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </APICacheProvider>
    </AppProvider>
  </StrictMode>,
);
