import L from '../../common/logger';
import {products, Product} from './products.service'
import { formatter, currencyToNumber } from './utils';
import  {discounts}  from './discounts'


export interface ProductOrder {
  productId: number;
  quantity: number;
}

type CustomError = {
  message: string,
  status?: number
}

interface CartItem {
  name: string,
  quantity: number,
  price: string,
  totalPrice: string,
  offers: string[],
  totalPriceDisc:  string
}

export interface Cart {
  items: CartItem [],
  grandTotal: string,
  grandTotalDisc: string
}

export class CartsService {

  create(orders: ProductOrder []): Promise<Cart> {
    const cart : Cart = generateCart(orders)
    L.info(`created cart: ${cart}`);
    return Promise.resolve(cart);
  }
}

/*  
  maybe we  should use a library like https://v1.dinerojs.com/ to make monoey  conversions, add, substractions...
  as the requirement is USD and for the sake of brevety we will use a fix currencyToNumbber function
*/

const generateCart = (orders:  ProductOrder []): Cart =>  {
  const cart:Cart =  {items: [], grandTotal: '$0.00', grandTotalDisc: '$0.00'};
  cart.items = orders.map(order => generateCartItem(order));
  cart.grandTotal = generateTotal(cart.items, 'totalPrice');
  const cartWithDiscounts = applyDiscounts(cart)
  cartWithDiscounts.grandTotalDisc = generateTotal(cart.items, 'totalPriceDisc');
  return cart
}

const  generateCartItem = (order: ProductOrder):CartItem => {
  const product: Product = products.filter(product => product.id===order.productId)[0];
  if (!product) {
    const error: CustomError = new Error('productId not found');
    error.status = 400;
    throw error;
  }
  
  const {name, customerPrice} = product;
  const  {quantity} = order;
  return {
    name,
    quantity,
    price: formatter.format(customerPrice),
    totalPrice: formatter.format(customerPrice * quantity),
    offers: [],
    totalPriceDisc: formatter.format(customerPrice * quantity)
  };
};


const applyDiscounts = (cart:Cart):Cart => discounts.reduce((cartWithDiscounts,discF)=>discF(cartWithDiscounts), cart)

const generateTotal = (items: CartItem [], field: string):string => {
  const totalPrice =  items.reduce((total, item) => total + currencyToNumber(item[field]),  0);
  return  formatter.format(totalPrice);
};

export default new CartsService();
