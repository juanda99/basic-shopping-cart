import L from '../../common/logger';
import {products, Product} from './products.service'

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
  totalPrice: string
}

interface Cart {
  items: CartItem [],
  grandTotal: string
}

export const carts: Cart[] = [
  { 
    items: [
      { name: 'Soup', quantity: 2, price: '$199.00', totalPrice: '$398.00' },
      { name: 'Cheese', quantity: 1, price: '$275.00', totalPrice: '$275.00' }
    ],
    grandTotal: '$673.00'
   },
];


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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const currencyToNumber =  (currency: string): number => Number(currency.replace(/[^0-9\.-]+/g,""));

const generateCart = (orders:  ProductOrder []): Cart =>  {
  const cart:Cart =  {items: [], grandTotal: '$0.00'};
  cart.items = orders.map(order => generateCartItem(order));
  cart.grandTotal = generateGrandTotal(cart.items);
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
    totalPrice: formatter.format(customerPrice * quantity)
  };
};

const generateGrandTotal = (items: CartItem []):string => {
  const totalPrice =  items.reduce((total, item) => total + currencyToNumber(item.totalPrice),  0);
  return  formatter.format(totalPrice);
};

export default new CartsService();

