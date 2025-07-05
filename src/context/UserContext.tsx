// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
}

const UserContext = createContext<{ user: User | null; isLoading: boolean }>({ user: null, isLoading: true });

// Hook de conveniencia para acceder al contexto de usuario
export const useUser = () => useContext(UserContext);

// Proveedor que carga el usuario actual desde el backend y lo expone por contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, consultar el perfil para mantener la sesión
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    axios.get('http://localhost:8000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
