import React, { useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const useBackdrop = () => {
  const [open, setOpen] = useState(false);

  const showBackdrop = () => {
    setOpen(true);
  };

  const hideBackdrop = () => {
    setOpen(false);
  };

  const BackdropComponent = () => (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return { BackdropComponent, showBackdrop, hideBackdrop };
};

export default useBackdrop;
