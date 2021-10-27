import {IProductsDomain} from './model';
import {createSelector} from 'reselect';

export const productsDomain = (state: any): IProductsDomain => state.products;

export const productsSelector = createSelector(
    productsDomain,
    (domain: IProductsDomain): IProductsDomain['data'] => domain.data
);

export const productsLoadingSelector = createSelector(
    productsDomain,
    (domain: IProductsDomain): IProductsDomain['loading'] => domain.loading
);
