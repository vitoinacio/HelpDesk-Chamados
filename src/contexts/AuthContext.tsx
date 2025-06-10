import { createContext } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isAdmin: false,
  setIsAdmin: () => {}
});

