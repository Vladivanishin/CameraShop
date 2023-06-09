import { createSlice } from '@reduxjs/toolkit';
import { Cameras } from '../../types/catalog';
import { Coupon, NameSpace } from '../../conts';

type BasketProcess = {
  basket: Cameras;
  coupon: Coupon | null;
}

const initialState : BasketProcess = {
  basket: [],
  coupon: null,
};

export const basketProcess = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {

  },
});
