import { createContext } from "react";

export type User = {
  id: string;
  fullName: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
