import { NameSpace } from '../../conts';
import { Cameras } from '../../types/catalog';
import { State } from '../../types/state';

export const getCameras = (state: State): Cameras =>
  state[NameSpace.Catalog].cameras;
