export const ITEMS_PER_PAGE = 9;
export const MAX_REVIEWS_COUNT = 3;
export const MIN_LENGTH_COMMENT = 5;
export const COUNT_STARS_REVIEW = 5;
export const DEFAULT_PAGINATION_PAGE = 1;
export const SEARCH_BAR_COUNT_CAMERAS = 4;
export const NONE_RATING = 0;
export const STARS_ARRAY_RATING = [1, 2, 3, 4, 5];
export const MIN_PRODUCT_COUNT = 1;
export const MAX_PRODUCT_COUNT = 99;

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
  Filters = 'FILTERS',
}

export enum CameraType {
  Digital = 'Цифровая',
  OldFilm = 'Плёночная',
  Momental = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum CameraCategory {
  Photo = 'Фотоаппарат',
  Video = 'Видеокамера',
}

export enum CameraApparat {
  Apparat = 'Фотоаппарат',
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

export enum KeyCode {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape',
}

export enum SortType {
  Price = 'по цене',
  Popular = 'по популярности',
}

export enum SortOrder {
  UP = 'По возрастанию',
  Down = 'По убыванию',
}

export const sortOrderQueryValue = {
  [SortOrder.UP]: 'up',
  [SortOrder.Down]: 'down'
};
