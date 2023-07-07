import { commerce, datatype, image, lorem, name } from 'faker';
import { Camera, CouponType, Promo, Review } from './types/catalog';
import { CameraCategory, CameraLevel, CameraType, Coupon } from './conts';

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
  coupon: lorem.word() as Coupon,
});
