import { CameraCategory, CameraLevel, CameraType } from '../conts';

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Cameras = Camera[];

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type Reviews = Review[];

export type ReviewRequest = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type ReviewResponse = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export type CouponType = {
  coupon: string;
}

export type Order = {
  camerasIds: [number, number];
  coupon: string | null;
}

