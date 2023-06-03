import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { fetchCamerasAction } from '../api-actions';

type CatalogProcess = {
  cameras: Cameras;
  isLoading: boolean;
}

const initialState: CatalogProcess = {
  cameras: [],
  isLoading: false,
};

export const catalogProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      });
  },
});
