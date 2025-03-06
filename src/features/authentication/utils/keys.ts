if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is not set');
}

export const secretKey = process.env.SESSION_SECRET;
export const encodedKey = new TextEncoder().encode(secretKey);

if (!encodedKey) {
  throw new Error('Failed to encode session secret');
}
