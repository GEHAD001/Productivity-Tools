export const secretKey = process.env.SESSION_SECRET;
export const encodedKey = new TextEncoder().encode(secretKey);
