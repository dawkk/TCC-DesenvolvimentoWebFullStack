import { createContext, useContext, useEffect, useState } from "react";
import http from "../../api/axios";
import IRole from "../../interfaces/IRoles";

interface IUserCredentials {
  id: string;
  email: string;
  roles: IRole[];
  isStaff: boolean;
}

interface IAuthContextType {
  user: IUserCredentials | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isStaff: boolean;
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
  const [isStaff, setIsStaff] = useState(false); // new state variable

  const fetchCurrentUser = async () => {
    try {
      const response = await http.get(`/users/me`);
      setUser(response.data);
      setIsLoading(false);
      setIsStaff(response.data.roles.includes(1000) || response.data.roles.includes(2000) || response.data.roles.includes(3000));
    } catch (error) {
      setIsLoading(false);
    }
  };

  /* useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await http.get(`/users/me`);
        setUser(response.data);
        setIsLoading(false);
        setIsStaff(response.data.roles.includes(1000) || response.data.roles.includes(2000) || response.data.roles.includes(3000));
      } catch (error) {
        setIsLoading(false);
      }
    }
  
    fetchCurrentUser();
  }, [setUser, setIsLoading, setIsStaff]); */

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function login(email: string, password: string) {
    try {
      const response = await http.post("/auth/login", { email, password });
      const { id, email: userEmail, roles, jwt } = response.data;
      const isStaff = roles.includes(1000) || roles.includes(2000) || roles.includes(3000);
      setUser({ id, email: userEmail, roles, isStaff });
      /* console.log('AuthProvider isStaff', isStaff)
      console.log('AuthProvider roles', roles)
      console.log('AuthProvider user during login after data response', user);
      console.log('AuthProvider data response', response.data) */
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
    <AuthContext.Provider value={{  user, isStaff, isLoading, login, logout }}>
       {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}