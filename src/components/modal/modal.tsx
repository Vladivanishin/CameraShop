import React, { useEffect, useRef, ReactNode, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal ({ isOpen, onClose, children }: ModalProps) : JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleEscClose = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div>
      <div
        className={`modal ${isModalOpen ? 'is-active' : ''}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={handleOverlayClick}
        onKeyDown={handleEscClose}
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

