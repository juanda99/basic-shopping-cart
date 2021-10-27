import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCTS_REQUEST,
  getProductsFailureAction,
  getProductsSuccessAction
} from './actions';
import { PRODUCTS_URL } from '../../../api';

// Extremely simple saga that's here just as an example
export function* getProductsSaga() {
  try {
    const { data } = yield call(axios.get, PRODUCTS_URL)
    yield put(getProductsSuccessAction(data));
  } catch (e) {
    yield put(getProductsFailureAction());
    console.log('Failed getting data from server');
  } 
}

export function* watchGetProductsSaga() {
  yield all([
    takeLatest([ GET_PRODUCTS_REQUEST ], getProductsSaga),
  ]);
}
