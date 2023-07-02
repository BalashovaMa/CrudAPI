"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const uuid_1 = require("uuid");
const uuid_2 = require("../utils/uuid");
let users = [];
const getAllUsers = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => {
    const userId = req.url.split('/').pop();
    if (!(0, uuid_2.isValidUUID)(userId)) {
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
exports.getUserById = getUserById;
const createUser = (req, res) => {
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
        const newUser = {
            id: (0, uuid_1.v4)(),
            username,
            age,
            hobbies: hobbies || [],
        };
        users.push(newUser);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const userId = req.url.split('/').pop();
    if (!(0, uuid_2.isValidUUID)(userId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid userId' }));
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body);
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'User not found' }));
        }
        const updatedUser = Object.assign(Object.assign({}, users[userIndex]), { username: username || users[userIndex].username, age: age || users[userIndex].age, hobbies: hobbies || users[userIndex].hobbies });
        users[userIndex] = updatedUser;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userId = req.url.split('/').pop();
    if (!(0, uuid_2.isValidUUID)(userId)) {
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
exports.deleteUser = deleteUser;
