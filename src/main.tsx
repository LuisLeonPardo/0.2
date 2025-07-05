import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './context/UserContext';

// Crea la raíz correctamente
const root = createRoot(document.getElementById('root')!);

// Renderiza la app envuelta con el contexto y el router
root.render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
