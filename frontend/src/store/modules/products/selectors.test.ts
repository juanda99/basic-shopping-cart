import { initialState } from './model';
import {productsLoadingSelector, productsSelector} from './selectors';

describe('Product selectors', () => {
  describe('productsSelector', () => {
    it('selects correctly', () => {
      const inputState = { ...initialState };
      expect(productsSelector.resultFunc(inputState)).toEqual([]);
    });
  });

  describe('productsLoadingSelector', () => {
    it('selects correctly', () => {
      const inputState = { ...initialState };
      expect(productsLoadingSelector.resultFunc(inputState)).toEqual(false);
    });
  });
});
