import { createServer, Server, IncomingMessage, ServerResponse,  } from 'http';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, handleNotFound } from './routes/users';


const port = process.env.PORT || 3000;

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    
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
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  });

  
  
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });