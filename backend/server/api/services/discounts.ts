import {Cart} from  './carts.service';
import { formatter, currencyToNumber } from './utils';
import {products} from './products.service'

type discountFunction = (cart: Cart) => Cart;

const SOUP =  'Soup';
const BREAD =  'Bread';
const CHEESE =  'Cheese';
const MILK = 'Milk';
const SOUP_AND_BREAD = 'soupAndBread';
const SUNDAY_SOUP = 'sundaySoup';
const DAIRY_DELICIOUS = 'dairyDelicious'


/* #### Offers
_Soup And Bread BOGOF_
Buy a loaf of bread and a can of soup and get another soup for free.
Maximum 3 free soups per customer.
*/

const soupAndBread = (cart:Cart):Cart => {
  const hasSoup = cart.items.some(item =>item.name===SOUP);
  const hasBread = cart.items.some(item =>item.name===BREAD);
  if (hasSoup && hasBread) {
    const soupQuantity = cart.items.filter(item=>item.name===SOUP)[0].quantity;
    const breadQuantity  = cart.items.filter(item=>item.name===BREAD)[0].quantity;
    const numSoupFree = breadQuantity >= soupQuantity ? Math.min(Math.floor(soupQuantity/2), 3) : Math.min(Math.floor(soupQuantity/2),  breadQuantity, 3)
    cart.items = cart.items.map(item => {
      if (item.name === SOUP && numSoupFree)  {
        item.offers = [SOUP_AND_BREAD];
        item.totalPriceDisc = formatter.format((item.quantity -  numSoupFree) * currencyToNumber(item.price));
      } else {
        item.offers = [];
        item.totalPriceDisc =  item.totalPrice;
      }
      return item;
    })
  }
  return cart
}

const isSunday = (): boolean => {
  const today = new Date();
  return today.getDay() === 0;
}

/*  
_Sunday Soup Sale_
Buy any can of soup on a Sunday and get 10% off.
*/

const sundaySoup = (cart:Cart):Cart => {
  const hasSoupToPay = cart.items.some(item =>item.name===SOUP && item.totalPriceDisc!=='$0.00');
  if (hasSoupToPay && isSunday()) {
    cart.items = cart.items.map(item => {
      if (item.name === SOUP)  {
        item.offers.push(SUNDAY_SOUP);
        const totalPriceDisc = currencyToNumber(item.totalPriceDisc);
        item.totalPriceDisc = formatter.format(totalPriceDisc - totalPriceDisc/10)
      }
      return item;
    })
  }
  return cart
}

/*
_Dairy Delicious_

Buy a block of cheese and we'll let you buy as much milk as you like, at the price we pay!
Offer not valid when the customer is participating in the Sunday Soup Sale.
*/

const dairyDelicious =  (cart: Cart): Cart => {
  const hasSundaySoupOffer = cart.items.some(item =>item.offers.includes(SUNDAY_SOUP));
  const hasCheese= cart.items.some(item=>item.name===CHEESE)
  const hasMilk = cart.items.some(item=>item.name===MILK)
  if (hasSundaySoupOffer || !hasCheese || !hasMilk)  return cart;
  cart.items = cart.items.map(item => {
    if (item.name === MILK)  {
      item.offers.push(DAIRY_DELICIOUS);
      const cost = products.filter(product => product.name===MILK)[0].cost;
      item.totalPriceDisc = formatter.format(item.quantity*cost);
    }
    return item;
  })
  return cart;
}

export const discounts: discountFunction[] = [
    soupAndBread,
    sundaySoup,
    dairyDelicious
]