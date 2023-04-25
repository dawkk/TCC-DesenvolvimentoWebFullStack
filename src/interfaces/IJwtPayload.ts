export interface IJwtPayload {
  id: string;
  roles: string[];
  iat: number;
  exp: number;
  name?: string;
  email?: string;
}
