import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (text: string) => toast(text);

export function handleScrollTopClick() {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

export function formatPrice(num: number): string {
  return num.toLocaleString('ru-RU');
}
