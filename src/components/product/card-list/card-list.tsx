import { Cameras } from '../../../types/catalog';
import Card from '../card/card';

type CardListProps = {
  cameras: Cameras;
}

export default function CardList ({cameras}: CardListProps) : JSX.Element{
  return(
    <div className="cards catalog__cards" data-testid="card-list">
      {cameras.map((camera) => (
        <Card
          key={camera.id}
          camera={camera}
        />
      ))}
    </div>
  );
}
