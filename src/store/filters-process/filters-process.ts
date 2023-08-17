import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CameraCategory, CameraLevel, CameraType, NameSpace } from '../../conts';

export type FilterProcess = {
  category: CameraCategory | null;
  types: CameraType[];
  levels: CameraLevel[];
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterProcess = {
  category: null,
  types: [],
  levels: [],
  minPrice: 0,
  maxPrice: 0
};

export const filtersProcess = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<CameraCategory | null>) => {
      state.category = action.payload;
    },
    changeType: (state, action: PayloadAction<CameraType>) => {
      if (state.types.includes(action.payload)) {
        state.types = state.types.filter((type) => type !== action.payload);
        return;
      }

      state.types.push(action.payload);
    },
    changeLevel: (state, action: PayloadAction<CameraLevel>) => {
      if (state.levels.includes(action.payload)) {
        state.levels = state.levels.filter((level) => level !== action.payload);
        return;
      }
      state.levels.push(action.payload);
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.types = [];
      state.levels = [];
      state.minPrice = 0;
      state.maxPrice = 0;
    }
  }
});

export const {
  changeCategory,
  changeLevel,
  changeType,
  setMinPrice,
  setMaxPrice,
  resetFilters
} = filtersProcess.actions;
