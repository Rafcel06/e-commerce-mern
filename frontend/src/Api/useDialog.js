// useDialog.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import useQueryHooks from './useQueryHook'
import { environtment } from '../Environment/environment';

const useDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [onClose, setOnClose] = useState(() => {});
  const { data, queryLoading, queryError } = useQueryHooks(environtment.api + "all-profile/", '',false,false,10,0);

  
  const openDialog = (title, message, onConfirmCallback, onCloseCallback) => {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirmCallback);
    setOnClose(() => onCloseCallback);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    onClose(); // Call onClose callback
  };

  const handleConfirm = () => {
    onConfirm();
    closeDialog();
   
  };




  const DialogComponent = () => (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        { queryError ? null :
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        } 
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return {
    openDialog,
    DialogComponent,
  };
};

export default useDialog;
