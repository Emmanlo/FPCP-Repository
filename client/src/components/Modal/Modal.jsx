import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'fade-in' : 'fade-out'}`}
      onClick={onClose} // Backdrop click
    >
      <div
        className={`modal-content ${isOpen ? 'slide-in' : 'slide-out'}`}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop closing when clicking inside
      >
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
