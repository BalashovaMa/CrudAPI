"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const users_1 = require("./routes/users");
const port = process.env.PORT || 3000;
const server = (0, http_1.createServer)((req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    if (pathname === '/api/users' && req.method === 'GET') {
        (0, users_1.getAllUsers)(req, res);
    }
    else if (pathname.startsWith('/api/users/') && req.method === 'GET') {
        (0, users_1.getUserById)(req, res);
    }
    else if (pathname === '/api/users' && req.method === 'POST') {
        (0, users_1.createUser)(req, res);
    }
    else if (pathname.startsWith('/api/users/') && req.method === 'PUT') {
        (0, users_1.updateUser)(req, res);
    }
    else if (pathname.startsWith('/api/users/') && req.method === 'DELETE') {
        (0, users_1.deleteUser)(req, res);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
