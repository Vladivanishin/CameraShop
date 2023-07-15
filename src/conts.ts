export const ITEMS_PER_PAGE = 9;
export const MAX_REVIEWS_COUNT = 3;
export const MIN_LENGTH_COMMENT = 5;
export const COUNT_STARS_REVIEW = 5;

export enum AppRoute {
  Catalog = '/catalog',
  CatalogPage = '/catalog/:page',
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

export enum TabsControl {
  Specifications = 'Характеристики',
  Description = 'Описание',
}
