import { Cameras } from '../../types/catalog';
import SimilarProductsSlider from '../similar-products-slider/similar-products-slider';

type SimilarProps = {
  cameras: Cameras;
}

export default function Similar({cameras}: SimilarProps) : JSX.Element{
  return(
    <div className="page-content__section" data-testid="similar">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <SimilarProductsSlider cameras={cameras}/>
        </div>
      </section>
    </div>
  );
}
