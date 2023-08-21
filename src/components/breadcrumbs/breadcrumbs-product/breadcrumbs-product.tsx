import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getSelectedProduct } from '../../../store/catalog-process/selectors';
import { AppRoute } from '../../../conts';

export default function BreadcrumbsProduct(): JSX.Element {
  const product = useAppSelector(getSelectedProduct);

  return (
    <div className="breadcrumbs" data-testid='breadcrumbs-product'>
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <span className="breadcrumbs__link breadcrumbs__link--active">{product?.name}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
