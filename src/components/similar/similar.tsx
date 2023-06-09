import { Cameras } from '../../types/catalog';
import SimilarList from '../similar-list/similar-list';

type SimilarProps = {
  cameras: Cameras;
}

export default function Similar({cameras}: SimilarProps) : JSX.Element{
  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <SimilarList cameras={cameras}/>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
