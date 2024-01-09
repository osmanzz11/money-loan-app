const request = require('supertest');
const app = require('../app');

describe('Test the registration endpoint', () => {
    test('It should respond with a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'testpassword' });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.username).toBe('testuser');
    });
});

// Write similar tests for other endpoints
