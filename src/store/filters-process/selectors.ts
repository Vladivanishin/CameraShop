import { CameraCategory, CameraLevel, CameraType, NameSpace } from '../../conts';
import { State } from '../../types/state';

export const getCurrentCategory = (state: State): CameraCategory | null =>
  state[NameSpace.Filters].category;

export const getCurrentTypes = (state: State): CameraType[] =>
  state[NameSpace.Filters].types;

export const getCurrentLevels = (state: State): CameraLevel[] =>
  state[NameSpace.Filters].levels;

export const getCurrentMinPrice = (state: State): number =>
  state[NameSpace.Filters].minPrice;

export const getCurrentMaxPrice = (state: State): number =>
  state[NameSpace.Filters].maxPrice;
