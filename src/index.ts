import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './routes/users';
import { handleServerError, handleNotFound } from './middlewares/errorHandler';

const port = process.env.PORT || 3000;

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { pathname } = new URL(req.url!, `http://${req.headers.host}`);

    if (pathname === '/api/users' && req.method === 'GET') {
      getAllUsers(req, res);
    } else if (pathname.startsWith('/api/users/') && req.method === 'GET') {
      getUserById(req, res);
    } else if (pathname === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (pathname.startsWith('/api/users/') && req.method === 'PUT') {
      updateUser(req, res);
    } else if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
      deleteUser(req, res);
    } else {
      handleNotFound(req, res);
    }
  },
);

server.on('error', (error: Error) => {
  handleServerError(error, {} as IncomingMessage, {} as ServerResponse);
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default server;
