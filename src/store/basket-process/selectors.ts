import { Coupon, NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { State } from '../../types/state';
import { productsAdapter } from './basket-process';

export const {
  selectIds,
  selectById: selectProductById,
  selectAll: selectAllBasketProducts,
} = productsAdapter.getSelectors<State>((state) => state[NameSpace.Basket]);

export const getBasketCameras = (state: State) : Cameras =>
  state[NameSpace.Basket].basketCameras;

export const getTotalPrice = (state: State): number =>
  state[NameSpace.Basket].totalPrice;

export const getTotalCount = (state: State): number =>
  state[NameSpace.Basket].totalCount;

export const getCoupon = (state: State): Coupon | 0 =>
  state[NameSpace.Basket].coupon;

export const getDiscountPercent = (state: State): number =>
  state[NameSpace.Basket].discount;

export const getLoadingBasketStatus = (state: State): boolean =>
  state[NameSpace.Basket].isLoading;

export const getErrorBasketStatus = (state: State): boolean =>
  state[NameSpace.Basket].isError;

