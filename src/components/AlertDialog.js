import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({title, description, acceptAction, component}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleAccept = (event) => {
    event.stopPropagation();
    acceptAction();
    setOpen(false);
  };


  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        {/* Open alert dialog */}
        {component}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAccept} autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}