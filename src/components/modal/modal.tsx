import { useEffect, useRef, ReactNode, useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { getModalSuccess } from '../../store/catalog-process/selectors';
import ReactFocusLock from 'react-focus-lock';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal ({ isOpen, onClose, children }: ModalProps) : JSX.Element {
  const isModalSuccess = useAppSelector(getModalSuccess);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);
  const handleOverlayClick = useCallback((evt: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(evt.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.addEventListener('keydown', handleEscapeKeydown);
      document.addEventListener('mousedown', handleOverlayClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKeydown);
      document.addEventListener('mousedown', handleOverlayClick);
    };
  }, [isOpen, handleEscapeKeydown, handleOverlayClick]);


  return (
    <div data-testid="modal">
      <div>
        <ReactFocusLock disabled={!isOpen} returnFocus>
          <div
            className={`modal ${isOpen ? 'is-active' : ''} ${isModalSuccess ? 'modal--narrow' : ''}`}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="modal__wrapper">
              <div className="modal__overlay">
              </div>
              <div className="modal__content" ref={modalRef}>
                {children}
              </div>
            </div>
          </div>
        </ReactFocusLock>
      </div>
    </div>
  );
}

