import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Review } from './types/catalog';

export const notify = (text: string) => toast(text);

export function handleScrollTopClick() {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

export function formatPrice(num: number): string {
  return num.toLocaleString('ru-RU');
}

export function getRating (reviews: Review[]) : number{
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const rating = Math.round(totalRating / reviews.length);
  return rating;
}
