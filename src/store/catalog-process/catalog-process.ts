import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { fetchCamerasAction } from '../api-actions';

type CatalogProcess = {
  cameras: Cameras;
}

const initialState: CatalogProcess = {
  cameras: [],
};

export const catalogProcess = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
      });
  },
});
