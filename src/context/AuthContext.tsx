/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "@/services/user";

export type User = {
  id: string;
  fullName: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  console.log("Provider value:", {
  user,
  loading,
  logout,
});

  return (
     <AuthContext.Provider
  value={{
    user,
    loading,
    setUser,
    logout,
  }}
>
      {children}
    </AuthContext.Provider>
  );
};

