import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { State } from '../../types/state';

export const getCameras = (state: State): Cameras =>
  state[NameSpace.Catalog].cameras;

export const getLoadingStatus = (state: State): boolean =>
  state[NameSpace.Catalog].isLoading;
