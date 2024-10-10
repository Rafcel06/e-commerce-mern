import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSnackbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); // success, error, warning, info

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };


  const SnackbarComponent = () => (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      message={message} // Provide message directly to Snackbar 
      action={
        <IconButton size="small" aria-label="close" color="inherit" 
           onClick={handleClose}
           >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        action={null} // Remove default action (icon) from Alert
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { SnackbarComponent, showSnackbar , setOpenSnackbar, openSnackbar};
};

export default useSnackbar;

