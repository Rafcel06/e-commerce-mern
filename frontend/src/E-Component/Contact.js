import React from 'react'
import useSnackbar from '../Api/useSnakbar'

const Files = () => {
  const { SnackbarComponent, showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar('This is a success message');
  };

 
  return (
    <div>
        Contact is under development
    </div>
  )
}

export default Files
