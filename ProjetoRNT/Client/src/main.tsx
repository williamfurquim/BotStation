// src/index.tsx
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Context } from './Context/Context';
import type { Usuario } from './types/Usuario';
import './index.css';

function Root() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  return (
    <Context.Provider value={{ usuarios, setUsuarios }}>
      <App />
    </Context.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);