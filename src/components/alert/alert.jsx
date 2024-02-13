import React from "react";
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { setAlertOpen } from "../../redux/appRedux";
import { useDispatch, useSelector } from 'react-redux';


export const AlertMsg = () => {

  const dispatcher = useDispatch();

  const alertMsg = useSelector((state) => state.app.alertMsg);
  const alertOpen = useSelector((state) => state.app.alertOpen);
  const alertType = useSelector((state) => state.app.alertType);
  
  return (
    <Collapse in={alertOpen} style={{ /*position: 'fixed', top: '20vh', */width: '100%', alignContent: 'center', zIndex: 99 }}>

      <Alert
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatcher(setAlertOpen(false));
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {alertMsg}

      </Alert>

    </Collapse>
  )
}