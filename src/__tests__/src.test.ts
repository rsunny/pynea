import request from 'supertest';
import app from '../app';
import { cleanDb } from '../utils/cleanDb';

describe('TEST machines', () => {
  it('should clean the db', async () => {
    cleanDb();
  });
  // Machines
  it('should add a machine', async () => {
    const response = await request(app).post('/machines').send({
      machineId: '1235',
      type: 'heavy',
      capacity: 10,
      status: 'new',
    });
    expect(response.status).toBe(201);
  });
  it('should fail since the machine object is bad', async () => {
    const response = await request(app).post('/machines').send({
      machineId: '1235',
      type: 'heavy',
      status: 'new',
    });
    expect(response.status).toBe(500);
  });
  it('should add a sweet', async () => {
    const response = await request(app)
      .post('/sweets')
      .send({
        name: 'kaju',
        ingredients: ['nom nom', 'tappi', 'kaju'],
        price: 25,
        quantityInStock: 50,
      });
    expect(response.status).toBe(201);
  });
  it('should add a machine produce sweet', async () => {
    const response = await request(app).post('/machines/produce').send({
      machineId: '1235',
      name: 'kaju',
    });
    expect(response.status).toBe(201);
  });
  it('should fail since there is no machine to produce sweet', async () => {
    const response = await request(app).post('/machines/produce').send({
      machineId: '1236',
      name: 'kaju',
    });
    expect(response.status).toBe(404);
  });
  it('should fail since there is no sweet', async () => {
    const response = await request(app).post('/machines/produce').send({
      machineId: '1235',
      name: 'kajuuuu',
    });
    expect(response.status).toBe(404);
  });
  it('should fetch the prodcued sweets', async () => {
    const response = await request(app).get('/machines/1235/sweets');
    expect(response.status).toBe(200);
    expect(response.body.sweets).toEqual([
      {
        ingredients: ['nom nom', 'tappi', 'kaju'],
        name: 'kaju',
        price: 25,
        quantityInStock: 50,
      },
    ]);
  });
  // Orders
  it('should add a order', async () => {
    const response = await request(app).post('/orders').send({
      orderId: '1235',
      customerName: 'test1',
      status: 'pending',
    });
    expect(response.status).toBe(201);
  });
  it('should fail since the order object is bad', async () => {
    const response = await request(app).post('/orders').send({
      orderId: 1235,
      customerName: 'test1',
      status: 'pending',
    });
    expect(response.status).toBe(500);
  });
  it('should add a order contains sweet', async () => {
    const response = await request(app).post('/orders/contains').send({
      orderId: '1235',
      name: 'kaju',
    });
    expect(response.status).toBe(201);
  });
  it('should fail since there is no order to contains sweet', async () => {
    const response = await request(app).post('/orders/contains').send({
      orderId: '1236',
      name: 'kaju',
    });
    expect(response.status).toBe(404);
  });
  it('should fail since there is no sweet', async () => {
    const response = await request(app).post('/orders/contains').send({
      orderId: '1235',
      name: 'kajuuuu',
    });
    expect(response.status).toBe(404);
  });
  it('should fetch the orders in pending and delivered', async () => {
    const response = await request(app).get('/orders/pending_or_delivered');
    expect(response.status).toBe(200);
    expect(response.body.orders).toEqual([
      {
        orderId: '1235',
        customerName: 'test1',
        status: 'pending',
      },
    ]);
  });
  // Sweets
  it('should fetch the orders for a given sweet', async () => {
    const response = await request(app).get('/sweets/orders?name=kaju');
    expect(response.status).toBe(200);
    expect(response.body.orders).toEqual([
      {
        orderId: '1235',
        customerName: 'test1',
        status: 'pending',
      },
    ]);
  });
  it('should fetch the sweets lesser than the given quantity', async () => {
    const response = await request(app).get('/sweets/quantity?quantity=100');
    expect(response.status).toBe(200);
    expect(response.body.sweets).toEqual([
      {
        ingredients: ['nom nom', 'tappi', 'kaju'],
        name: 'kaju',
        price: 25,
        quantityInStock: 50,
      },
    ]);
  });
});
