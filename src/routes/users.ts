import { Request, Response } from 'http';
import { User } from '../models/User';
import { isValidUUID } from '../utils/uuid';

let users: User[] = [];

export const getAllUsers = (req: Request, res: Response) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  };

  export const getUserById = (req: Request, res: Response) => {
    const userId = req.url!.split('/').pop() as string;
  
    if (!isValidUUID(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid userId' }));
    }
  
    const user = users.find((user) => user.id === userId);
  
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
  
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  };

  export const createUser = (req: Request, res: Response) => {
    let body = '';
  
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
  
      if (!username || !age) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Username and age are required' }));
      }
  
      const newUser: User = {
        id: uuidv4(),
        username,
        age,
        hobbies: hobbies || [],
      };
  
      users.push(newUser);
  
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  };

  export const deleteUser = (req: Request, res: Response) => {
    const userId = req.url!.split('/').pop() as string;
  
    if (!isValidUUID(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid userId' }));
    }
  
    const userIndex = users.findIndex((user) => user.id === userId);
  
    if (userIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User not found' }));
    }
  
    users.splice(userIndex, 1);
  
    res.writeHead(204);
    res.end();
  };

