import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalBuy} from '../../store/catalog-process/catalog-process';
import { getModalBuyStatus } from '../../store/catalog-process/selectors';
import ModalAddBasket from '../modal-add-basket/modal-add-basket';
import Modal from '../modal/modal';

export default function ModalBuy() : JSX.Element{
  const isModalBuy = useAppSelector(getModalBuyStatus);
  const dispatch = useAppDispatch();

  const handleCloseBuyModal = () => {
    dispatch(modalBuy(!isModalBuy));
  };

  return(
    <Modal isOpen={isModalBuy} onClose={handleCloseBuyModal}>
      <ModalAddBasket isOpen={isModalBuy} onClose={handleCloseBuyModal}/>
    </Modal>
  );
}
