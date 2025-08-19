import { NextRequest } from 'next/server';

export const isAuthenticatedByApiKey = (req: NextRequest): false | string => {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return false;
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return false;
  }

  return token;
};
