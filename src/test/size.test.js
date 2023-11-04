const request = require('supertest');
const app = require('../../app');

describe('Get /api/v1/sizes', () => {
    test('should get all sizes', async () => {
        const response = await request(app).get('/api/v1/sizes');
        expect(response.status).toBe(200);
    });
});

let sizeId = ""

describe('Create Size /api/v1/size/', () => {
    test('should create one size', async () => {
        const newSize = {
            size: "Size Test Size",
            available: true
        }
        const response = await request(app).post('/api/v1/sizes').send(newSize);
        sizeId = response.body.data._id
        expect(response.status).toBe(201);
    });

    test('should send create error', async () => {
        //Size with no size text
        const newSize = {
            available: true
        }
        const response = await request(app).post('/api/v1/sizes').send(newSize);
        expect(response.status).toBe(400);
    });
});

describe('Get One /api/v1/sizes/', () => {
    test('should get one size', async () => {
        const response = await request(app).get('/api/v1/sizes/'+sizeId);
        expect(response.status).toBe(200);
    });

    test('should send error size not found', async () => {
        const response = await request(app).get('/api/v1/sizes/'+sizeId+"1");
        expect(response.status).toBe(404);
    });
});

describe('Delete /api/v1/sizes/', () => {
    test('should delete one size', async () => {
        const response = await request(app).delete('/api/v1/sizes/'+sizeId);
        expect(response.status).toBe(200);
    });

    test('should send error size not found', async () => {
        const response = await request(app).delete('/api/v1/sizes/'+sizeId);
        expect(response.status).toBe(404);
    });
});