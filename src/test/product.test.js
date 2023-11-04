const request = require('supertest');
const app = require('../../app');

describe('Get /api/v1/products', () => {
    test('should get all products', async () => {
        const response = await request(app).get('/api/v1/products');
        expect(response.status).toBe(200);
    });
});

let productId = ""

describe('Create Product /api/v1/products/', () => {
    test('should create one product', async () => {
        const newProduct = {
            "title": "Product Test Title",
            "category": "Product Test Category",
            "price": 10,
            "img": "Product Test Img",
            "color": "Product Test Color",
            "description": "Test Description",
            "stockQuantity": 5,
            "sizes": ["6538820c3bbd369621f05393", "6538820c3bbd369621f05393", "6538820c3bbd369621f05393"],
            "brand": "Test Brand",
            "discount": 0
        };
          
        const response = await request(app).post('/api/v1/products').send(newProduct);
        productId = await response.body.data._id
        expect(response.status).toBe(201);
    });

    test('should send create error', async () => {

        //Product with no title
        const newProduct = {
            category: "Product Test Category",
            price: 10,
            img: "Product Test Img",
            color: "Product Test Color",
            description: "Test Description",
            stockQuantity: 5,
            sizes: ["6538820c3bbd369621f05393", "6538820c3bbd369621f05393", "6538820c3bbd369621f05393"],
            brand: "Test Brand",
            discount: 0
        };
          
        const response = await request(app).post('/api/v1/products').send(newProduct);
        expect(response.status).toBe(400);
    });
});

describe('Get One /api/v1/products/', () => {
    test('should get one product', async () => {
        const response = await request(app).get('/api/v1/products/'+productId);
        expect(response.status).toBe(200);
    });

    test('should get error not found product', async () => {
        const response = await request(app).get('/api/v1/products/'+productId+"1");
        expect(response.status).toBe(404);
    });
});

describe('Delete /api/v1/products/', () => {
    test('should delete one product', async () => {
        const response = await request(app).delete('/api/v1/products/'+productId);
        expect(response.status).toBe(200);
    });

    test('should get error not found product', async () => {
        const response = await request(app).get('/api/v1/products/'+productId+"1");
        expect(response.status).toBe(404);
    });
});