import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

 
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);   
  };

  const Modal = ({ title, content, actions }) => {
    return (
      <Dialog open={isOpen} onClose={closeModal}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>{content}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    );
  };

  return { Modal, openModal, closeModal, isOpen };
};

export default  useModal;
