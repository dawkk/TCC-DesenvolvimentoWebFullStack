import { createContext, useEffect, useState } from "react";
import http from "../../api/axios";
import { IAuthProvider, IContext, IUser } from "../../interfaces/IUser";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";


export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>()
 
 

  useEffect(() => {
    const user = getUserLocalStorage();
    


    if(user) {
      setUser(user);
    }
  }, [])

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);
    console.log('essa é a resposta do authenticate', response)
    /* aqui foi colocado roles na tentativa de agregar os roles ao objeto */
    const payload = { token: response.token, roles: response.roles, email};

    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    http.get("/auth/logout");
    setUser(null);
    setUserLocalStorage(null);
  }



  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}