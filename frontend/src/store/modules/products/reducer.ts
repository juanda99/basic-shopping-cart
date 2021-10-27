import {IProductsDomain, initialState} from './model';
import * as Actions from './actions';

const productsReducer = (state: IProductsDomain = initialState, action: Actions.ProductsAction) => {
  switch (action.type) {
 
    case Actions.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: false };

    case Actions.GET_PRODUCTS_SUCCESS: {
      const data =  action.payload.data.map(product =>  ({...product, inCart: false, quantity: 1}))
      return { data,  loading: false, error: false };
    }
    case Actions.GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: true };

    case Actions.REMOVE_PRODUCT:  {
      const data = state.data.map(product => {
        if (product.id === action.payload.id) return {...product, inCart: false, quantity: 1};
        return product;
      })
      return { ...state, data }
    }

    case Actions.ADD_PRODUCT:  {
      const data = state.data.map(product => {
        if (product.id === action.payload.id) return {...product, inCart: true};
        return product;
      })
      return { ...state, data }
    }

    case Actions.INCREASE_PRODUCT:  {
      const data = state.data.map(product => {
        if (product.id === action.payload.id) return {...product, quantity: ++product.quantity } 
        return product;
      })
      return { ...state, data };
    }

    case Actions.DECREASE_PRODUCT:  {
      const data = state.data.map(product => {
        if (product.id === action.payload.id) {
          /* we only can remove when number of items is 1 from the cart */
          return product.quantity===1 ? {...product, inCart: false} : {...product, quantity: --product.quantity }
        }
        return product;
      })
      return { ...state, data };
    }

    default:
      return state;
  }
};

export default productsReducer;
