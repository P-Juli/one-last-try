'use client'
import React from 'react';
import './modal.css';

const Modal = (props) => {
  return (
    <div className="modal-overlay" onClick={()=>props.setShowDetails(false)}>
      <div className="modal-content" onClick={()=>props.setShowDetails(false)} >
      <span className="close-button" onClick={props.onClose}>&times;</span>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;