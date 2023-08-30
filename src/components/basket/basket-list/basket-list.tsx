import { useAppSelector } from '../../../hooks';
import { getBasketCameras } from '../../../store/basket-process/selectors';
import BasketEmpty from '../basket-empty/basket-empty';
import BasketItem from '../basket-item/basket-item';

export default function BasketList() : JSX.Element{
  const basketCameras = useAppSelector(getBasketCameras);
  return(
    <ul className="basket__list" data-testid='basket-list'>
      { basketCameras.length
        ? basketCameras.map((camera) => (<BasketItem camera={camera} key={camera.id} />))
        : <BasketEmpty/>}
    </ul>
  );
}
