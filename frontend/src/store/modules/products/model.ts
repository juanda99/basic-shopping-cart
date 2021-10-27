/* inCart and quantity are used for getting products inside the cart */
export type Product = {
  id: number,
  name: string,
  customerPrice: number,
  cost: number,
  inCart:boolean,
  quantity:  number
}

export type  ServerData = {
  id: number,
  name: string,
  customerPrice: number,
  cost: number,
}


export interface IProductsDomain {
  data: Product[];
  loading: boolean;
  error: boolean;
}

export const initialState: IProductsDomain = {
  data: [],
  loading: false,
  error: false
};


