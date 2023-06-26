import { Cameras } from '../../types/catalog';
import ProductSlider from '../product-slider/product-slider';

type SimilarProps = {
  cameras: Cameras;
}

export default function Similar({cameras}: SimilarProps) : JSX.Element{
  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <ProductSlider cameras={cameras}/>
        </div>
      </section>
    </div>
  );
}
