export interface Payload {
  userId: string;
  username: string;
  expiresAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  redirect?: string;
}

export interface SessionData {
  session: string;
  expiresAt: Date;
}

export interface JWTPayload {
  payload: Payload;
  protectedHeader: {
    alg: "HS256";
  };
}
