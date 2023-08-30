import { Coupon } from '../../conts';
import { makeFakeCamera } from '../../mocks';
import { productsAdapter, basketProcess, decrementCameraCount, removeCamera, setCameraCount, setCoupon, addBasketCamera, initialState, resetBasket } from './basket-process';

const camera = makeFakeCamera();
const mockState = productsAdapter.addOne(productsAdapter.getInitialState({
  ...initialState,
  basketCameras: [{...camera, count: 1, price: 1}],
  isLoading: false,
  isError: false,
  totalCount: 1,
  totalPrice: 1,
  discount: 0,
  coupon: Coupon.First,
}), {
  ...camera,
  price: 1,
  count: 1,
  totalPrice: 1,
});

describe('basketProcess', () => {
  it('without additional parameters should return initial state', () => {

    expect(basketProcess.reducer(mockState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(mockState);
  });

  it('should add camera to basket when dispatch addCamera', () => {
    const product = makeFakeCamera();
    product.id = 2;
    product.count = 1;
    product.totalPrice = 1;
    product.price = 1;
    const newState = productsAdapter.addOne({...mockState, basketCameras: [{...camera, count: 1, price: 1}, product]}, { ...product, count: 1, totalPrice: product.price});

    expect(basketProcess.reducer(mockState, addBasketCamera(product)))
      .toEqual({ ...newState, totalPrice: 2, totalCount: 2});
  });

  it('should decrease product count on dispatch decrementCount', () => {
    const newState = productsAdapter.upsertOne({...mockState, basketCameras: [{...camera, count: 0, price: 1}]}, { ...camera, count: 0, totalPrice: 0, price: 1 });

    expect(basketProcess.reducer(mockState, decrementCameraCount(camera)))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0 });
  });

  it('should remove product  on dispatch removeCamera', () => {
    const newState = productsAdapter.removeOne({...mockState, basketCameras: []}, 1);

    expect(basketProcess.reducer(mockState, removeCamera(camera)))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0 });
  });

  it('should change product count on dispatch setCameraCount', () => {
    const newState = productsAdapter.upsertOne({...mockState, basketCameras: [{...camera, count: 5, price: 1}]}, { ...camera, count: 5, totalPrice: 5, price: 1 });

    expect(basketProcess.reducer(mockState, setCameraCount({ id: 1, count: 5 })))
      .toEqual({ ...newState, totalPrice: 5, totalCount: 5 });
  });

  it('Should change coupon by a given coupon', () => {
    expect(basketProcess.reducer(mockState, setCoupon(Coupon.Second)))
      .toEqual({
        ...mockState,
        coupon: Coupon.Second
      });
  });

  it('should reset state', () => {
    const newState = productsAdapter.removeOne({...mockState, basketCameras: []}, 1);

    expect(basketProcess.reducer(mockState, resetBasket()))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0, coupon: 0 });
  });

});
