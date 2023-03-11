import { createContext, useEffect, useState } from "react";
import http from "../../api/axios";
import { IAuthProvider, IContext, ILogin } from "../../interfaces/ILogin";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "./util";


export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<ILogin | null>()
 
 

  useEffect(() => {
    const user = getUserLocalStorage();
    if(user) {
      setUser(user);
    }
  }, [])

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);
    /* aqui foi colocado roles na tentativa de agregar os roles ao objeto */
    const payload = { jwt: response.accessToken, roles: response.roles, id:response.id};

    setUser(payload);
    setUserLocalStorage(payload);
    console.log('esse é o payload', payload)
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