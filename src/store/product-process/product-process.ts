import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, TabsControl } from '../../conts';
import { Cameras, ReviewResponse } from '../../types/catalog';
import { fetchPostReviewAction, fetchReviewsAction, fetchSimilarAction } from '../api-actions';

type ProductProcess = {
  similarCameras: Cameras;
  currentTabControl: TabsControl;
  reviews: ReviewResponse[];
  reviewSuccess: boolean;
}

const initialState: ProductProcess = {
  similarCameras: [],
  currentTabControl: TabsControl.Description,
  reviews: [],
  reviewSuccess: false,
};

export const productProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    selectTabsControl: (state, action: PayloadAction<TabsControl>) => {
      state.currentTabControl = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchPostReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export const { selectTabsControl } = productProcess.actions;
