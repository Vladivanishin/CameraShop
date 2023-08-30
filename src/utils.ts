import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, Cameras, Review } from './types/catalog';
import { CameraCategory, CameraLevel, CameraType, SortOrder, SortType } from './conts';
import { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import { State } from './types/state';

export const notify = (text: string) => toast(text);

export function handleScrollTopClick() {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

export function formatPrice(num: number): string {
  return num.toLocaleString('ru-RU');
}

export function getRating(reviews: Review[]): number {
  const totalRating = reviews.reduce((acc, review) => {
    if (review && review.rating) {
      return acc + review.rating;
    } else {
      return acc;
    }
  }, 0);
  const rating = Math.round(totalRating / reviews.length);
  return rating;
}

export function getRatingCameras(cameras: Cameras): Cameras {
  return cameras.map((camera) => {
    if (camera.reviews) {
      const totalRating = camera.reviews.reduce((acc, review) => acc + review.rating, 0);
      const rating = Math.round(totalRating / camera.reviews.length);
      return {
        ...camera,
        rating,
      };
    } else {
      return camera;
    }
  });
}

export const filterCamerasByCategory = (cameras: Camera[], category: CameraCategory | null): Camera[] => {
  if (!category) {
    return cameras;
  }

  return cameras.filter((camera) => camera.category === category);
};

export const filterCamerasByTypes = (cameras: Camera[], types: CameraType[]): Camera[] => {
  if (!types.length) {
    return cameras;
  }

  return cameras.filter((camera) => types.includes(camera.type));
};

export const filterCamerasByLevels = (cameras: Camera[], levels: CameraLevel[]): Camera[] => {
  if (!levels.length) {
    return cameras;
  }

  return cameras.filter((camera) => levels.includes(camera.level));
};

export const getPrice = (cameras: Camera[], type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const filterCamerasByPrice = (cameras: Camera[], minPrice: number, maxPrice: number): Camera[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  return cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
};

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const filterCameras = (cameras: Camera[], category: CameraCategory | null, types: CameraType[], levels: CameraLevel[], minPrice: number, maxPrice: number): Camera[] => {
  const filteredCamerasByCategory = filterCamerasByCategory(cameras, category);
  const filteredCamerasByTypes = filterCamerasByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterCamerasByLevels(filteredCamerasByTypes, levels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCamerasByLevels, minPrice, maxPrice);

  return filteredCamerasByPrice;
};

export const sortCameras = (cameras: Camera[], sortType: SortType | null, sortOrder: SortOrder | null): Camera[] => {
  let sortedCamerasByType: Camera[] = [];

  switch (sortType) {
    case SortType.Popular:
      sortedCamerasByType = [...cameras].sort((a, b) => b.rating - a.rating);
      break;
    case SortType.Price:
      sortedCamerasByType = [...cameras].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedCamerasByType = [...cameras];
      break;
  }

  let sortedCamerasByOrder: Camera[] = [];

  switch (sortOrder) {
    case SortOrder.UP:
      sortedCamerasByOrder = sortedCamerasByType.reverse();
      break;
    case SortOrder.Down:
      sortedCamerasByOrder = sortedCamerasByType;
      break;
    default:
      sortedCamerasByOrder = [...cameras];
      break;
  }

  return sortedCamerasByOrder;
};

export const getTotalProductPrice = (price: number, count: number) => price * count;

export const getInitialEntityAdapterState = <T, S extends object>(
  adapter: EntityAdapter<T>,
  initialState: S,
  localStorageResult?: string | null
) => {

  if (localStorageResult) {
    const result = JSON.parse(localStorageResult) as EntityState<T> & S;

    return adapter.setAll(
      adapter.getInitialState({ ...result }),
      result.entities as Record<EntityId, T>
    );
  }


  return adapter.getInitialState<S>(initialState);
};

export const saveToLocalStorage = (state: State['BASKET']) => {
  const data = {
    ...state,
    discount: 0,
    coupon: 0,
  } as State['BASKET'];
  localStorage.setItem('LOCAL_STORAGE', JSON.stringify(data));

};

export const getDiscount = (totalPrice: number, discount: number) => Math.round(totalPrice / 100 * discount);

export const getFinalPrice = (totalPrice: number, discount: number) => totalPrice - discount;
