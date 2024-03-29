import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, SortOrder, SortType } from '../../conts';
import { Camera, Cameras, Promo } from '../../types/catalog';
import { State } from '../../types/state';
import { filterCameras, sortCameras } from '../../utils';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../filters-process/selectors';

export const getCameras = (state: State): Cameras =>
  state[NameSpace.Catalog].cameras;

export const getLoadingStatus = (state: State): boolean =>
  state[NameSpace.Catalog].isLoading;

export const getPromo = (state: State): Promo | null =>
  state[NameSpace.Catalog].promo;

export const getSelectedProduct = (state: State) : Camera | null =>
  state[NameSpace.Catalog].product;

export const getModalBuyStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalBuy;

export const getModalReviewStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalReview;

export const getModalSuccess = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalSuccess;

export const getSelectedSortType = (state: State) : SortType | null =>
  state[NameSpace.Catalog].sortType;

export const getSelectedSortOrder = (state: State) : SortOrder | null =>
  state[NameSpace.Catalog].sortOrder;

export const getCurrentPage = (state: State) : number | null =>
  state[NameSpace.Catalog].currentPage;

export const getCurrentCameras = (state: State): Cameras =>
  state[NameSpace.Catalog].currentCameras;

export const getCamerasWithRating = (state: State): Cameras =>
  state[NameSpace.Catalog].camerasWithRating;

export const getSortedCameras = createSelector(
  [getCameras, getSelectedSortType, getSelectedSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

export const getFilteredCameras = createSelector(
  [getSortedCameras, getCurrentCategory, getCurrentTypes, getCurrentLevels, getCurrentMinPrice, getCurrentMaxPrice],
  (cameras, category, types, levels, minPrice, maxPrice) => filterCameras(cameras, category, types, levels, minPrice, maxPrice)
);

export const getModalProductAddedStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalProductAdded;

export const getModalRemoveStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalRemove;

export const getModalSuccessOrder = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalSuccessOrder;
