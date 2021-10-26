import 'mocha';
import { expect } from 'chai';
import { set, reset } from 'mockdate';
import request from 'supertest';
import Server from '../server';

/*
export const products: Product[] = [
  { id: id++, name: 'Soup', customerPrice: 199, cost: 186 },
  { id: id++, name: 'Bread', customerPrice: 87, cost: 21 },
  { id: id++, name: 'Cheese', customerPrice: 275, cost: 234 },
  { id: id++, name: 'Milk', customerPrice: 67, cost: 61 },
];

*/

describe('Carts', () => {

  it('should get the cart', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 4, quantity: 1}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$67.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$67.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Milk', quantity: 1, price: '$67.00', totalPrice: '$67.00', totalPriceDisc: '$67.00', offers: [] }
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
describe('Soup offer on workday', () => {
  beforeEach(() => {
    const  date =  '2021-10-25T18:09:12.451Z'
    set(date)
  })
  afterEach(() => {
    reset()
  })
  it('should not apply soupBread', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 1},
        {productId: 2, quantity: 2},
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$373.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$373.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 1, price: '$199.00', totalPrice: '$199.00', totalPriceDisc: '$199.00', offers: [] },
            { name: 'Bread', quantity: 2, price: '$87.00', totalPrice: '$174.00', totalPriceDisc: '$174.00', offers: [] }
          ])
  }));
  it('should apply soupBread', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 2},
        {productId: 2, quantity: 2}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$572.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$373.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 2, price: '$199.00', totalPrice: '$398.00', totalPriceDisc: '$199.00', offers: ['soupAndBread'] },
            { name: 'Bread', quantity: 2, price: '$87.00', totalPrice: '$174.00', totalPriceDisc: '$174.00', offers: [] }
          ])
      }));
  it('should apply soupBread with "big numbers (thousands)"', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 4},
        {productId: 2, quantity: 10}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$1,666.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$1,268.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 4, price: '$199.00', totalPrice: '$796.00', totalPriceDisc: '$398.00', offers: ['soupAndBread'] },
            { name: 'Bread', quantity: 10, price: '$87.00', totalPrice: '$870.00', totalPriceDisc: '$870.00', offers: [] }
          ])
      }));
  it('should apply soupBread but max 3', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 10},
        {productId: 2, quantity: 4}
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$2,338.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$1,741.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 10, price: '$199.00', totalPrice: '$1,990.00', totalPriceDisc: '$1,393.00', offers: ['soupAndBread'] },
            { name: 'Bread', quantity: 4, price: '$87.00', totalPrice: '$348.00', totalPriceDisc: '$348.00', offers: [] }
          ])
    }));
  it('should apply soupAndBread but not sundaySoup', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 2},
        {productId: 2, quantity: 2},
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$572.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$373.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 2, price: '$199.00', totalPrice: '$398.00', totalPriceDisc: '$199.00', offers: ['soupAndBread'] },
            { name: 'Bread', quantity: 2, price: '$87.00', totalPrice: '$174.00', totalPriceDisc: '$174.00', offers: [] }
          ])
  }));
});

describe('Carts on Sunday', () => {

  beforeEach(() => {
    const  date =  '2021-10-24T18:09:12.451Z'
    set(date)
  })
  afterEach(() => {
    reset()
  })
  it('should apply free soup and 10%', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 2},
        {productId: 2, quantity: 2},
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$572.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$353.10');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 2, price: '$199.00', totalPrice: '$398.00', totalPriceDisc: '$179.10', offers: ['soupAndBread', 'sundaySoup'] },
            { name: 'Bread', quantity: 2, price: '$87.00', totalPrice: '$174.00', totalPriceDisc: '$174.00', offers: [] }
          ])
  }));

  it('dairy delicious offer', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 3, quantity: 2},
        {productId: 4, quantity: 2},
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$684.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$672.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Cheese', quantity: 2, price: '$275.00', totalPrice: '$550.00', totalPriceDisc: '$550.00', offers: [] },
            { name: 'Milk', quantity: 2, price: '$67.00', totalPrice: '$134.00', totalPriceDisc: '$122.00', offers: ['dairyDelicious'] }
          ])
      }));

  it('dairy delicious offer not applied with sundaySoup', () =>
    request(Server)
      .post('/api/v1/carts')
      .send({ orders: [
        {productId: 1, quantity: 1},
        {productId: 3, quantity: 1},
        {productId: 4, quantity: 1},
      ] })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotal')
          .equal('$541.00');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('grandTotalDisc')
          .equal('$521.10');
        expect(r.body)
          .to.be.an('object')
          .that.has.property('items')
          .to.eql([
            { name: 'Soup', quantity: 1, price: '$199.00', totalPrice: '$199.00', totalPriceDisc: '$179.10', offers: ['sundaySoup'] },
            { name: 'Cheese', quantity: 1, price: '$275.00', totalPrice: '$275.00', totalPriceDisc: '$275.00', offers: [] },
            { name: 'Milk', quantity: 1, price: '$67.00', totalPrice: '$67.00', totalPriceDisc: '$67.00', offers: [] }
          ])
    }));

});





// export const products: Product[] = [
//   { id: id++, name: 'Soup', customerPrice: 199, cost: 186 },
//   { id: id++, name: 'Bread', customerPrice: 87, cost: 21 },
//   { id: id++, name: 'Cheese', customerPrice: 275, cost: 234 },
//   { id: id++, name: 'Milk', customerPrice: 67, cost: 61 },
// ];