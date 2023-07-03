"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const users_1 = require("./routes/users");
const errorHandler_1 = require("./middlewares/errorHandler");
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
        (0, errorHandler_1.handleNotFound)(req, res);
    }
});
server.on('error', (error) => {
    (0, errorHandler_1.handleServerError)(error, {}, {});
});
if (process.env.NODE_ENV !== 'test') {
    server.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
exports.default = server;
