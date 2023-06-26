import { ReviewResponse } from '../../types/catalog';
import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviews: ReviewResponse[];
}

export default function ReviewsList ({reviews}: ReviewListProps): JSX.Element{

  return(
    <ul className="review-block__list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review}/>
      ))}
    </ul>
  );
}
