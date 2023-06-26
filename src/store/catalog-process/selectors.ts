import { NameSpace } from '../../conts';
import { Camera, Cameras, Promo } from '../../types/catalog';
import { State } from '../../types/state';

export const getCameras = (state: State): Cameras =>
  state[NameSpace.Catalog].cameras;

export const getLoadingStatus = (state: State): boolean =>
  state[NameSpace.Catalog].isLoading;

export const getPromo = (state: State): Promo | undefined =>
  state[NameSpace.Catalog].promo;

export const getSelectedProduct = (state: State) : Camera | undefined =>
  state[NameSpace.Catalog].product;

export const getModalStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalOpen;

export const getModalReviewStatus = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalReview;

export const getModalSuccess = (state: State) : boolean =>
  state[NameSpace.Catalog].isModalSuccess;
