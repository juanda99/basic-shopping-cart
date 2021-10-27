import {ServerData} from './model'
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT ='REMOVE_PRODUCT'
export const INCREASE_PRODUCT ='INCREASE_PRODUCT'
export const DECREASE_PRODUCT ='DECREASE_PRODUCT'

export type GetProductsRequestAction = ReturnType<typeof getProductsRequestAction>;
export const getProductsRequestAction = () => ({
  type: GET_PRODUCTS_REQUEST as typeof GET_PRODUCTS_REQUEST
});

export type GetProductsSuccessAction = ReturnType<typeof getProductsSuccessAction>;
export const getProductsSuccessAction =  (data:ServerData[]) => ({
  type: GET_PRODUCTS_SUCCESS as typeof GET_PRODUCTS_SUCCESS,
  payload: {data}
});

export type GetProductsFailureAction = ReturnType<typeof getProductsFailureAction>;
export const getProductsFailureAction = () => ({
  type: GET_PRODUCTS_FAILURE as typeof GET_PRODUCTS_FAILURE
});

export type AddProductAction = ReturnType<typeof addProductAction>;
export const addProductAction = (id: number) => ({
  type: ADD_PRODUCT as typeof ADD_PRODUCT,
  payload: {id} 
});

export type RemoveProductAction = ReturnType<typeof removeProductAction>;
export const removeProductAction = (id: number) => ({
  type: REMOVE_PRODUCT as typeof REMOVE_PRODUCT,
  payload: {id} 
});

export type IncreaseProductAction = ReturnType<typeof increaseProductAction>;
export const increaseProductAction = (id: number) => ({
  type: INCREASE_PRODUCT as typeof INCREASE_PRODUCT,
  payload: {id} 
});

export type DecreaseProductAction = ReturnType<typeof decreaseProductAction>;
export const decreaseProductAction = (id: number) => ({
  type: DECREASE_PRODUCT as typeof DECREASE_PRODUCT,
  payload: {id} 
});

export type ProductsAction =
  | GetProductsRequestAction
  | GetProductsSuccessAction
  | GetProductsFailureAction
  | AddProductAction
  | RemoveProductAction
  | IncreaseProductAction
  | DecreaseProductAction ;
