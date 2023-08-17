import { CameraCategory, CameraLevel, CameraType } from '../../conts';
import { FilterProcess, changeCategory, changeLevel, changeType, filtersProcess, resetFilters, setMaxPrice, setMinPrice } from './filters-process';

describe('Reducer: filterProcess', () => {

  let state: FilterProcess;

  beforeEach(() => {
    state = {
      category: null,
      types: [],
      levels: [],
      minPrice: 0,
      maxPrice: 0
    };
  });
  it('Should return initial state without additional parameters', () => {
    expect(filtersProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should change current category by a given category', () => {
    expect(filtersProcess.reducer(state, changeCategory(CameraCategory.Photo)))
      .toEqual({
        ...state,
        category: CameraCategory.Photo
      });
  });

  it('Should change current types by a given type', () => {
    expect(filtersProcess.reducer(state, changeType(CameraType.Collection)))
      .toEqual({
        ...state,
        types: [CameraType.Collection]
      });
  });

  it('Should change current levels by a given level', () => {
    expect(filtersProcess.reducer(state, changeLevel(CameraLevel.Amateur)))
      .toEqual({
        ...state,
        levels: [CameraLevel.Amateur]
      });
  });

  it('Should set min price', () => {
    expect(filtersProcess.reducer(state, setMinPrice(1000)))
      .toEqual({
        ...state,
        minPrice: 1000
      });
  });

  it('Should set max price', () => {
    expect(filtersProcess.reducer(state, setMaxPrice(1000)))
      .toEqual({
        ...state,
        maxPrice: 1000
      });
  });

  it('Should reset all filters', () => {
    expect(filtersProcess.reducer(state, resetFilters()))
      .toEqual(state);
  });
});
