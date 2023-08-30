import { useAppDispatch, useAppSelector } from '../../../hooks';
import { modalReview } from '../../../store/catalog-process/catalog-process';
import { getModalReviewStatus } from '../../../store/catalog-process/selectors';
import Modal from '../modal/modal';
import ReviewForm from '../../review-form/review-form';

export default function ModalReview() : JSX.Element{
  const isModalReview = useAppSelector(getModalReviewStatus);
  const dispatch = useAppDispatch();

  const handleCloseReviewModal = () => {
    dispatch(modalReview(!isModalReview));
  };

  return(
    <Modal isOpen={isModalReview} onClose={handleCloseReviewModal}>
      <ReviewForm />
    </Modal>
  );
}
