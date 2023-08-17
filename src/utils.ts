import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, Cameras, Review } from './types/catalog';
import { CameraCategory, CameraLevel, CameraType } from './conts';

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

// export const getRating = (reviews: Review[]): number => {
//   const rating = reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;
//   return rating;
// };

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
