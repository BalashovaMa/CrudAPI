"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotFound = exports.handleServerError = void 0;
const handleServerError = (error, req, res) => {
    console.error('Server Error:', error);
    const statusCode = 500;
    const errorMessage = 'Internal Server Error';
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: errorMessage }));
};
exports.handleServerError = handleServerError;
const handleNotFound = (req, res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
};
exports.handleNotFound = handleNotFound;
