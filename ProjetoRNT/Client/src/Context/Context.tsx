import { createContext, useState } from "react";
import type { Usuario } from "../types/Usuario"; // caminho do seu tipo

interface ContextProps {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

export const Context = createContext<ContextProps>({
  usuarios: [],
  setUsuarios: () => {},
});

export const ProviderUsuarios = ({ children }: { children: React.ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  return (
    <Context.Provider value={{ usuarios, setUsuarios }}>
      {children}
    </Context.Provider>
  );
};