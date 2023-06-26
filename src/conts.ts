export const ITEMS_PER_PAGE = 9;
export const MAX_REVIEWS_COUNT = 3;

export enum AppRoute {
  Catalog = '/catalog',
  Product ='/product/:id',
  Basket = '/basket'
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpace {
  Catalog = 'CATALOG',
  Product = 'PRODUCT',
  Basket = 'BASKET',
}

export enum CameraType {
  Collection = 'Коллекционная',
  Momental = 'Моментальная',
  Digital = 'Цифровая',
  OldFilm = 'Плёночная'
}

export enum CameraCategory {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

export enum CameraLevel {
  Unskilled = 'Нулевой',
  Amateur = 'Любительский',
  Pro = 'Профессиональный',
}

export enum Coupon {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

export enum TabsControl {
  Specifications = 'Характеристики',
  Description = 'Описание',
}
