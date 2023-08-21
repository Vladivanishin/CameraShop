import { commerce, datatype, image, lorem, name } from 'faker';
import { Camera, CouponType, Promo, Review } from './types/catalog';
import { CameraCategory, CameraLevel, CameraType, NameSpace, TabsControl } from './conts';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from './types/state';
import { Action } from 'redux';
import { createAPI } from './store/services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: lorem.word(),
  type: CameraType.Collection,
  category: CameraCategory.Photo,
  description: commerce.productDescription(),
  level: CameraLevel.Unskilled,
  price: datatype.number(),
  reviewCount: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  rating: datatype.number(),
});

export const makeFakeReview = () : Review => ({
  id: datatype.uuid(),
  createAt: datatype.string(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  review: commerce.productDescription(),
  rating: datatype.number(),
});

export const makeFakePromo = () : Promo => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakeCoupon = () : CouponType => ({
  coupon: lorem.word(),
});

export const api = createAPI();

export const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

export const makeMockStore = mockStore({
  [NameSpace.Catalog]: {
    cameras: [makeFakeCamera()],
    isLoading: false,
    isError: false,
    promo: makeFakePromo(),
    product: makeFakeCamera(),
    isModalBuy: false,
    isModalReview: false,
    isModalSuccess: false,
  },
  [NameSpace.Product]: {
    similarCameras: [makeFakeCamera()],
    currentTabControl: TabsControl.Description,
    reviews: [makeFakeReview()],
  },
});
