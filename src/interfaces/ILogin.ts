export interface ILogin {
  email?:string;
  jwt?:string;
}

export interface IContext extends ILogin {
  authenticate: (email:string, password:string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element
}