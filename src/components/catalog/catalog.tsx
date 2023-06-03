import { Cameras } from '../../types/catalog';
import Card from '../card/card';

type CatalogProps = {
  cameras: Cameras;
}

export default function Catalog ({cameras}: CatalogProps) : JSX.Element{
  return(
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <Card
          key={camera.id}
          camera={camera}
        />
      ))}
    </div>
  );
}
