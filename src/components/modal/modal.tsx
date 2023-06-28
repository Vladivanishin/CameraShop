import React, { useEffect, useRef, ReactNode, useCallback } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal ({ isOpen, onClose, children }: ModalProps) : JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [isOpen, handleEscapeKeydown]);


  return (
    <div>
      <div
        className={`modal ${isOpen ? 'is-active' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        ref={modalRef}
      >
        <div className="modal__wrapper">
          <div className="modal-overlay" />
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

