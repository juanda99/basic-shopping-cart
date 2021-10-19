import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Carts', () => {

  it('should get the cart', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 2},
        {productId: 3, quantity: 1}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$673.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 2, price: '$199.00', totalPrice: '$398.00' },
            { name: 'Cheese', quantity: 1, price: '$275.00', totalPrice: '$275.00' }
          ])
      }));
  it('should get an empty cart if no items', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$0.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([])
      }));
  it('should throw an error if a productId not exists', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 17, quantity: 2}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.statusCode).to.equal(400);
        expect(r.body.errors[0].message).to.equal('productId not found');
      }));
});
