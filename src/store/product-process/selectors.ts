import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { State } from '../../types/state';

export const getSimilarCameras = (state: State) : Cameras =>
  state[NameSpace.Product].similarCameras;
