import http from "../../api/axios";
import { ILogin } from "../../interfaces/ILogin";

export function setUserLocalStorage (user:ILogin | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage () {
  const json = localStorage.getItem('user');
  if(!json) {
    return null
  }
  const user = JSON.parse(json)
  return user ?? null
}

export async function LoginRequest (email:string, password: string){
  try{
    const request = await http.post("/auth/login", {email, password});

    return request.data;
  } catch (error) {
    
    return null
  }
}

/* 
 tentativa de error handle

 import { ErrorResponse } from "../../interfaces/IErrorResponse";

catch (error:any) {
  let errorResponse: ErrorResponse;
  if (error instanceof Error) {
    errorResponse = {
      code: 500,
      message: "An unknown error occurred",
    };
  } else {
    errorResponse = {
      code: error.status,
      message: error.statusText,
    };
  }
  return errorResponse;
} */