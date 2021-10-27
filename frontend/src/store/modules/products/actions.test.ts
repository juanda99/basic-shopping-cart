import {
  getProductsFailureAction,
  getProductsRequestAction,
  getProductsSuccessAction
} from "./actions";
import { serverData } from "./mockData";

import {productData} from './mockData'
describe('Products actions', () => {

  it('Get Products request action', () => {
    expect(getProductsRequestAction()).toMatchSnapshot();
  });

  it('Get Products  success action', () => {
    expect(getProductsSuccessAction(serverData)).toMatchSnapshot();
  });

  it('Get Products failure action', () => {
    expect(getProductsFailureAction()).toMatchSnapshot();
  });
});
