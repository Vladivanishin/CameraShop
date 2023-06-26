import { NameSpace, TabsControl } from '../../conts';
import { Cameras, ReviewResponse } from '../../types/catalog';
import { State } from '../../types/state';

export const getSimilarCameras = (state: State) : Cameras =>
  state[NameSpace.Product].similarCameras;

export const getCurrentTabControl = (state: State): TabsControl =>
  state[NameSpace.Product].currentTabControl;

export const getReviews = (state: State): ReviewResponse[] =>
  state[NameSpace.Product].reviews;
