import { IncomingMessage, ServerResponse } from 'http';

export const handleServerError = (error: Error, req: IncomingMessage, res: ServerResponse) => {
  console.error('Server Error:', error);

  const statusCode = 500;
  const errorMessage = 'Internal Server Error';

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: errorMessage }));
};