import { createContext, useContext, useEffect, useState } from "react";
import http from "../../api/axios";
import { Box, CircularProgress, Typography } from "@mui/material";

interface IUserCredentials {
  id: string;
  email: string;
  roles: IRole[];
  isStaff: boolean;
}

export default interface IRole {
  roleNumber: number;
  roleName: number;
}

interface IAuthContextType {
  user: IUserCredentials | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType | null>(null);

export function useAuth(): IAuthContextType {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUserCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await http.get(`/users/me`);
        const userRoles = Object.keys(response.data.roles);
        const isStaff = userRoles.includes('Admin') || userRoles.includes('Editor') || userRoles.includes('Employee');
        const updatedUser = { ...response.data, isStaff };
        setUser(updatedUser);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    fetchCurrentUser();
  }, [setUser, setIsLoading]);

  async function login(email: string, password: string) {
    try {
      const response = await http.post("/auth/login", { email, password });
      const { id, email: userEmail, roles, jwt } = response.data;
      const isStaff = roles.includes(1000) || roles.includes(2000) || roles.includes(3000);
      setUser({ id, email: userEmail, roles, isStaff });
      http.defaults.headers.common["Authorization"] = `Bearer ${jwt}; SameSite=None; Secure`;
    } catch (error) {
      console.error("Failed to login", error);
      throw error;
    }
  }

  function logout() {
    http.get("/auth/logout", { withCredentials: true });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {isLoading ?   <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box textAlign="center">
        <CircularProgress color="primary" />
        <Typography variant="body1" mt={2}>
          Loading...
        </Typography>
      </Box>
    </Box> : children}
    </AuthContext.Provider>
  );
}