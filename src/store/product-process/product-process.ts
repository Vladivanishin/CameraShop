import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { fetchSimilarAction } from '../api-actions';

type ProductProcess = {
  similarCameras: Cameras;

}

const initialState: ProductProcess = {
  similarCameras: [],
};

export const productProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      });
  },
});

