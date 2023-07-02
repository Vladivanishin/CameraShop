import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../conts';
import { Camera, Cameras, Promo } from '../../types/catalog';
import { fetchCameraAction, fetchCamerasAction, fetchPostReviewAction, fetchPromoAction } from '../api-actions';

type CatalogProcess = {
  cameras: Cameras;
  isLoading: boolean;
  promo: Promo | undefined;
  product: Camera | undefined;
  isModalBuy: boolean;
  isModalReview: boolean;
  isModalSuccess: boolean;
}

const initialState: CatalogProcess = {
  cameras: [],
  isLoading: false,
  promo: undefined,
  product: undefined,
  isModalBuy: false,
  isModalReview: false,
  isModalSuccess: false,
};

export const catalogProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Camera>) => {
      state.product = action.payload;
    },
    modalBuy: (state, action: PayloadAction<boolean>) => {
      state.isModalBuy = action.payload;
    },
    modalReview: (state, action: PayloadAction<boolean>) => {
      state.isModalReview = action.payload;
    },
    modalSuccess: (state, action: PayloadAction<boolean>) => {
      state.isModalSuccess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        if(state.promo !== undefined){
          state.isLoading = false;
        }
        state.promo = action.payload;
      })
      .addCase(fetchCameraAction.pending,(state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled,(state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchPostReviewAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPostReviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isModalReview = false;
        state.isModalSuccess = true;
      });
  },
});

export const {selectProduct, modalBuy, modalReview, modalSuccess} = catalogProcess.actions;
