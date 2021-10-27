import * as Actions from './actions';
import reducer from './reducer';
import { initialState } from './model';
import productData, { serverData } from './mockData'
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

describe('Products reducer', () => {

  it('handles GET_PRODUCTS_REQUEST correctly', () => {
    const action = Actions.getProductsRequestAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, loading: true, error: false };
    expect(result).toEqual(expected);
  });

  it('handles GET_PRODUCTS_SUCCESS correctly', () => {
    const action = Actions.getProductsSuccessAction(serverData);
    const result = reducer(initialState, action);
    const expected = { ...initialState, data: productData };
    expect(result).toEqual(expected);
  });

  it('handles GET_PRODUCTS_FAILURE correctly', () => {
    const action = Actions.getProductsFailureAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, loading: false, error: true };
    expect(result).toEqual(expected);
  });

  it('handles REMOVE_PRODUCT correctly', () => {
    const initialState = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: true,
        quantity: 1,
      }],
      loading: false, error: false
    }
    const action = Actions.removeProductAction(1);
    const result = reducer(initialState, action);
    const expected = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 1,
      }],
      loading: false, error: false
    };
    expect(result).toEqual(expected);
  });

  it('handles ADD_PRODUCT correctly', () => {
    const initialState = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 1,
      }],
      loading: false, error: false
    };
    const action = Actions.addProductAction(1);
    const result = reducer(initialState, action);
    const expected = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: true,
        quantity: 1,
      }],
      loading: false, error: false
    };
    expect(result).toEqual(expected);
  });

  it('handles INCREASE_PRODUCT correctly', () => {
    const initialState = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 1,
      }],
      loading: false, error: false
    };
    const action = Actions.increaseProductAction(1);
    const result = reducer(initialState, action);
    const expected = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 2,
      }],
      loading: false, error: false
    };
    expect(result).toEqual(expected);
  });

  it('handles DECREASE_PRODUCT correctly', () => {
    const initialState = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 2,
      }],
      loading: false, error: false
    };
    const action = Actions.decreaseProductAction(1);
    const result = reducer(initialState, action);
    const expected = {
      data: [{
        id: 1,
        name: 'Soup',
        customerPrice: 199,
        cost: 186,
        inCart: false,
        quantity: 1,
      }],
      loading: false, error: false
    };
    expect(result).toEqual(expected);
  });

});
