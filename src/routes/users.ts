import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import { isValidUUID } from '../utils/uuid';

let users: User[] = [];

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  };

  export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
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

  export const createUser = (req: IncomingMessage, res: ServerResponse) => {
    let body = '';
  
    req.on('data', (chunk: Buffer | string) => {
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

  export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
    const userId = req.url!.split('/').pop() as string;
  
    if (!isValidUUID(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid userId' }));
    }
  
    let body = '';
  
    req.on('data', (chunk: Buffer | string) => {
      body += chunk;
    });
  
    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
  
      const userIndex = users.findIndex((user) => user.id === userId);
  
      if (userIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'User not found' }));
      }
  
      const updatedUser: User = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        age: age || users[userIndex].age,
        hobbies: hobbies || users[userIndex].hobbies,
      };
  
      users[userIndex] = updatedUser;
  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    });
  };

  export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
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
  export const handleNotFound = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }

