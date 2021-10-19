import { Application } from 'express';
import productsRouter from './api/controllers/products/router';
import cartsRouter from './api/controllers/carts/router';
export default function routes(app: Application): void {
  app.use('/api/v1/products', productsRouter);
  app.use('/api/v1/carts', cartsRouter);
}