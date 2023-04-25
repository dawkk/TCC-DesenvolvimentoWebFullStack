import jwtDecode, { JwtDecodeOptions } from 'jwt-decode';
import { IJwtPayload } from "../../interfaces/IJwtPayload";

export function jwtDecodeToken(token: string): IJwtPayload | null {
  try {
    const decoded = jwtDecode(token, { secretOrPublicKey: process.env.JWT_SECRET } as JwtDecodeOptions) as unknown as (IJwtPayload & { iat: number, exp: number });
    return {
      id: decoded.id,
      roles: decoded.roles,
      iat: decoded.iat,
      exp: decoded.exp
    };
  } catch (error) {
    console.error('Failed to decode JWT token', error);
    return null;
  }
}
