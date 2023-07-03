import request from 'supertest';
import server from '../src/index';

describe('API Tests', () => {
    let createdUserId: string;

    test('Get all records with a GET api/users request (an empty array is expected)', async () => {
        const response = await request(server).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    test('A new object is created by a POST api/users request (a response containing the newly created record is expected)', async () => {
        const newUser = { name: 'John Doe', email: 'john@example.com' };
        const response = await request(server).post('/api/users').send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.email).toBe(newUser.email);
        createdUserId = response.body.id;
    });

    test('With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
        const response = await request(server).get(
            `/api/users/${createdUserId}`
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdUserId);
    });

    test('We try to update the created record with a PUT api/users/{userId} request (a response is expected containing an updated object with the same id)', async () => {
        const updatedUser = {
            name: 'Updated Name',
            email: 'updated@example.com',
        };
        const response = await request(server)
            .put(`/api/users/${createdUserId}`)
            .send(updatedUser);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdUserId);
        expect(response.body.name).toBe(updatedUser.name);
        expect(response.body.email).toBe(updatedUser.email);
    });

    test('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
        const response = await request(server).delete(
            `/api/users/${createdUserId}`
        );
        expect(response.status).toBe(204);
    });
});
