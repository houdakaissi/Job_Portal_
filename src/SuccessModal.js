import React from 'react';
import './SuccessModal.css'; // Import CSS for styling

const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-icon">✔️</span> {/* You can use a green checkmark icon */}
          
        <div>  <h1>Your application was successfully sent!</h1></div>
        </div>
        <div className="modal-body">
         
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
