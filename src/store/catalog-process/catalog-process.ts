import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortOrder, SortType } from '../../conts';
import { Camera, Cameras, Promo } from '../../types/catalog';
import { fetchCameraAction, fetchCamerasAction, fetchPostReviewAction, fetchPromoAction } from '../api-actions';

export type CatalogProcess = {
  cameras: Cameras;
  isLoading: boolean;
  isError: boolean;
  promo: Promo | null;
  product: Camera | null;
  isModalBuy: boolean;
  isModalReview: boolean;
  isModalSuccess: boolean;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  currentPage: number | null;
  currentCameras: Cameras;
  camerasWithRating: Cameras;
}

const initialState: CatalogProcess = {
  cameras: [],
  isLoading: false,
  isError: false,
  promo: null,
  product: null,
  isModalBuy: false,
  isModalReview: false,
  isModalSuccess: false,
  sortType: null,
  sortOrder: null,
  currentPage: null,
  currentCameras: [],
  camerasWithRating: [],
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
    selectSortType: (state, action: PayloadAction<SortType | null>) => {
      state.sortType = action.payload;
    },
    selectSortOrder: (state, action: PayloadAction<SortOrder | null>) => {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentCameras: (state, action: PayloadAction<Cameras>) => {
      state.currentCameras = action.payload;
    },
    setCamerasWithRating: (state, action: PayloadAction<Cameras>) => {
      state.camerasWithRating = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        if(state.promo !== null){
          state.isLoading = false;
        }
        state.promo = action.payload;
      })
      .addCase(fetchCameraAction.pending,(state) => {
        state.isLoading = true;
      })
      .addCase(fetchCameraAction.fulfilled,(state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchCameraAction.rejected,(state) => {
        state.isError = true;
      })
      .addCase(fetchPostReviewAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostReviewAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isModalReview = false;
        state.isModalSuccess = true;
      })
      .addCase(fetchPostReviewAction.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isModalReview = false;
        state.isModalSuccess = false;
      });
  },
});

export const {selectProduct, modalBuy, modalReview, modalSuccess, selectSortType, selectSortOrder, setCurrentPage ,setCurrentCameras, setCamerasWithRating} = catalogProcess.actions;
