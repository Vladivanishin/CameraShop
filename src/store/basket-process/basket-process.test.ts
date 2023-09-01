import { EntityState } from '@reduxjs/toolkit';
import { BasketCamera, Camera } from '../../types/catalog';
import { BasketProcess, addBasketCamera, basketProcess, decrementCameraCount, productsAdapter, removeCamera, resetBasket, setCameraCount, setCoupon, setErrorStatus } from './basket-process';
import { CameraCategory, CameraLevel, CameraType } from '../../conts';

const initialState: EntityState<BasketCamera> & BasketProcess = {
  ...productsAdapter.getInitialState(),
  basketCameras: [],
  isLoading: false,
  isError: null,
  totalCount: 0,
  totalPrice: 0,
  discount: 0,
  coupon: 0,
  ids: [],
  entities: {},
};

describe('basketProcess', () => {
  const camera1 : Camera = {
    id: 1, name: 'Camera 1', price: 100,
    vendorCode: '123',
    type: CameraType.Collection,
    category: CameraCategory.Photo,
    description: '123',
    level: CameraLevel.Amateur,
    reviewCount: 0,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
    rating: 0,
    count: 1,
    totalPrice: 100,
  };
  const camera2 : Camera = {
    id: 2, name: 'Camera 2', price: 200,
    vendorCode: '123',
    type: CameraType.Collection,
    category: CameraCategory.Photo,
    description: '123',
    level: CameraLevel.Amateur,
    reviewCount: 0,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
    rating: 0,
    count: 1,
    totalPrice: 200,
  };
  const camera3 : Camera = {
    id: 3, name: 'Camera 3', price: 300,
    vendorCode: '123',
    type: CameraType.Collection,
    category: CameraCategory.Photo,
    description: '123',
    level: CameraLevel.Amateur,
    reviewCount: 0,
    previewImg: '',
    previewImg2x: '',
    previewImgWebp: '',
    previewImgWebp2x: '',
    rating: 0,
    count: 2,
    totalPrice: 300,
  };

  it('without additional parameters should return initial state', () => {
    expect(basketProcess.reducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should add a camera to the basket', () => {
    const state = basketProcess.reducer(initialState, addBasketCamera(camera1));
    expect(state.basketCameras).toEqual([camera1]);
    expect(state.totalCount).toBe(1);
    expect(state.totalPrice).toBe(100);
  });

  it('should remove a camera from the basket', () => {
    const state = basketProcess.reducer({...initialState, basketCameras: [camera1, camera2], totalCount: 1, totalPrice: 200}, removeCamera(camera1));
    expect(state.basketCameras).toEqual([camera2]);
    expect(state.totalCount).toBe(1);
    expect(state.totalPrice).toBe(200);
  });

  it('should decrement the count of a camera in the basket', () => {
    const state = basketProcess.reducer({...initialState, basketCameras: [camera3], totalCount: 1, totalPrice: 300}, decrementCameraCount(camera3));
    expect(state.basketCameras).toEqual([{...camera3, count: 2}]);
    expect(state.totalCount).toBe(1);
    expect(state.totalPrice).toBe(300);
  });

  it('should set the count of a camera in the basket', () => {
    const state = basketProcess.reducer({...initialState, basketCameras: [camera1], totalCount: 2, totalPrice: 200}, setCameraCount({ id: camera1.id, count: 2 }));
    expect(state.basketCameras).toEqual([camera1]);
    expect(state.totalCount).toBe(2);
    expect(state.totalPrice).toBe(200);
  });

  it('should set the coupon code', () => {
    const state = basketProcess.reducer(initialState, setCoupon('DISCOUNT10'));
    expect(state.coupon).toBe('DISCOUNT10');
  });

  it('should reset the basket', () => {
    const state = basketProcess.reducer(initialState, resetBasket());
    expect(state).toEqual({
      basketCameras: [],
      isLoading: false,
      isError: null,
      totalCount: 0,
      totalPrice: 0,
      discount: 0,
      coupon: 0,
      ids: [],
      entities: {},
    });
  });

  it('should set the error status', () => {
    const state = basketProcess.reducer(initialState, setErrorStatus(true));
    expect(state).toEqual({
      basketCameras: [],
      isLoading: false,
      isError: true,
      totalCount: 0,
      totalPrice: 0,
      discount: 0,
      coupon: 0,
      ids: [],
      entities: {},
    });
  });
});
