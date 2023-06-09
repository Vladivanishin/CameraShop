import { Coupon, NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { State } from '../../types/state';

export const getBasket = (state: State): Cameras =>
  state[NameSpace.Basket].basket;

export const getCoupon = (state: State): Coupon | null =>
  state[NameSpace.Basket].coupon;
