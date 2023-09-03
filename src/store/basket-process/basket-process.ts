import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../conts';
import { BasketCamera, Camera, Cameras } from '../../types/catalog';
import { getInitialEntityAdapterState, saveToLocalStorage } from '../../utils';
import { fetchPostCouponAction, fetchPostNewOrderAction } from '../api-actions';

export type BasketProcess = {
  basketCameras: Cameras;
  isLoading: boolean;
  isError: boolean | null;
  isPromoValid: boolean;
  totalCount: number;
  totalPrice: number;
  discount: number;
  coupon: string | 0 | null;
}

export const initialState: BasketProcess = {
  basketCameras: [],
  isLoading: false,
  isError: null,
  isPromoValid: false,
  totalCount: 0,
  totalPrice: 0,
  discount: 0,
  coupon: 0,
};

export const productsAdapter = createEntityAdapter<BasketCamera>();

const localStorageResult = localStorage.getItem('LOCAL_STORAGE');

const stateWithAdapter = getInitialEntityAdapterState(productsAdapter, {...initialState }, localStorageResult);


export const basketProcess = createSlice({
  name: NameSpace.Basket,
  initialState: stateWithAdapter,
  reducers: {
    addBasketCamera: (state, action: PayloadAction<Camera>) => {
      const product = state.entities[action.payload.id];
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedCamera?.count) {
        product.count ++;
        findedCamera.count ++;
        findedCamera.totalPrice = findedCamera.count * findedCamera.price;
        product.totalPrice = product.count * product.price;
        state.totalPrice += product.price;
      } else {
        state.basketCameras.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
        productsAdapter.addOne(state, { ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalCount++;

      saveToLocalStorage(state);
    },decrementCameraCount: (state, action: {payload: Camera}) => {


      const product = state.entities[action.payload.id];
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedCamera && findedCamera.count) {
        product.count--;
        product.totalPrice = product.count * product.price;

        state.totalCount--;
        state.totalPrice -= product.price;

        findedCamera.count--;

        saveToLocalStorage(state);
      }

    },
    removeCamera: (state, action: {payload: Camera}) => {
      const product = state.entities[action.payload.id];
      if (product) {
        state.totalCount -= product.count;
        state.totalPrice -= product.totalPrice;
      }

      state.basketCameras = state.basketCameras.filter((camera) => camera.id !== action.payload.id);

      productsAdapter.removeOne(state, action.payload.id);

      saveToLocalStorage(state);

    },
    setCameraCount: (state, action: {payload: { id: number; count: number }}) => {
      const product = state.entities[action.payload.id];
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedCamera) {
        state.totalCount -= product.count;
        product.count = action.payload.count;

        state.totalPrice -= product.totalPrice;
        product.totalPrice = product.count * product.price;

        state.totalCount += product.count;
        state.totalPrice += product.totalPrice;

        findedCamera.count = action.payload.count;

        saveToLocalStorage(state);
      }
    },
    setCoupon: (state, action: {payload: string | null}) => {
      state.coupon = action.payload;
    },
    setErrorStatus: (state, action: {payload: boolean | null}) => {
      state.isError = action.payload;
    },
    setPromoValidStatus: (state, action: {payload: boolean}) => {
      state.isPromoValid = action.payload;
    },
    resetBasket() {
      localStorage.removeItem('LOCAL_STORAGE');
      return productsAdapter.getInitialState(initialState);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostCouponAction.pending, (state) => {
        state.isError = null;
        state.isPromoValid = true;
      })
      .addCase(fetchPostCouponAction.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.isError = false;
        state.isPromoValid = true;
      })
      .addCase(fetchPostCouponAction.rejected, (state) => {
        state.isError = true;
        state.isPromoValid = true;
      })
      .addCase(fetchPostNewOrderAction.fulfilled, (state) => {
        state.basketCameras = [];
        state.totalCount = 0;
        state.discount = 0;
        state.coupon = 0;
      });
  }
});
export const {
  addBasketCamera,
  decrementCameraCount,
  removeCamera,
  setCameraCount,
  setCoupon,
  resetBasket,
  setErrorStatus,
  setPromoValidStatus
} = basketProcess.actions;
