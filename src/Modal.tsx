import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const contentStyle: React.CSSProperties = {
  background: '#fff',
  padding: 20,
  borderRadius: 8,
  width: '90%',
  maxWidth: 500,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: 'right', marginBottom: 10 }}>
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
