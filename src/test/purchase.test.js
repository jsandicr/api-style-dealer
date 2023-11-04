const request = require('supertest');
const app = require('../../app');

describe('Checkout /api/v1/checkout/', () => {
    test('should create one size', async () => {
        const newPurchase =
        {
            userEmail: "prueba@prueba.com",
            amount: 100,
            items: [
                {
                    id: "653fe19e5cc495eb4f101a05",
                    product: {
                        _id: "653fe135b97629edeb16c483",
                        category: "Product Test Category",
                        price: 10,
                        img: "Product Test Img",
                        color: "Product Test Color",
                        description: "Test Description",
                        stockQuantity: 5,
                        sizes: ["6538820c3bbd369621f05393", "6538820c3bbd369621f05393", "6538820c3bbd369621f05393"],
                        brand: "Test Brand",
                        discount: 0
                    },
                    quantity: 1
                }
            ]
        }
        const response = await request(app).post('/api/v1/purchase/checkout').send(newPurchase);
        expect(response.status).toBe(201);
    });

    test('should send create error', async () => {
        //Size with no userEmail
        const newPurchase =
        {
            amount: 100,
            items: [
                {
                    id: "653fe19e5cc495eb4f101a05",
                    product: {
                        _id: "653fe135b97629edeb16c483",
                        category: "Product Test Category",
                        price: 10,
                        img: "Product Test Img",
                        color: "Product Test Color",
                        description: "Test Description",
                        stockQuantity: 5,
                        sizes: ["6538820c3bbd369621f05393", "6538820c3bbd369621f05393", "6538820c3bbd369621f05393"],
                        brand: "Test Brand",
                        discount: 0
                    },
                    quantity: 1
                }
            ]
        }
        const response = await request(app).post('/api/v1/purchase/checkout').send(newPurchase);
        expect(response.status).toBe(400);
    });

    test('should send create error', async () => {
        //Size with no userEmail
        const newPurchase =
        {
            userEmail: "prueba@prueba.com",
            amount: 100,
            items: []
        }
        const response = await request(app).post('/api/v1/purchase/checkout').send(newPurchase);
        expect(response.body.message).toBe("No items");
    });
});