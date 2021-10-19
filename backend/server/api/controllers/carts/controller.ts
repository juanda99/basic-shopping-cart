import CartsService,  {ProductOrder} from '../../services/carts.service';
import { Request, Response, NextFunction } from 'express';

export class Controller {

  create(req: Request, res: Response): void {
    const { orders } :  { orders: ProductOrder [] } = req.body;
    CartsService.create(orders).then((r) => res.status(200).json(r));
  }
}
export default new Controller();