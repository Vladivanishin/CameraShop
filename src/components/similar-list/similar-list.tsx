import { Cameras } from '../../types/catalog';
import SimilarCard from '../similar-card/similar-card';

type SimilarListProps = {
  cameras: Cameras;
}

export default function SimilarList ({cameras}: SimilarListProps) : JSX.Element{
  return(
    <div className="product-similar__slider-list" data-testid="similar-list">
      {cameras.map((camera) => (
        <SimilarCard
          key={camera.id}
          camera={camera}
        />
      ))}
    </div>
  );
}
