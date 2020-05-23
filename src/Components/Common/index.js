import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import {
  IconButton,
  Popover,
  Box,
  Snackbar as MUISnackbar,
  Typography,
  DialogTitle as MUIDialogTitle,
  DialogContent as MUIDialogContent,
  DialogActions as MUIDialogActions,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MUIDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MUIDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
}))(MUIDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MUIDialogActions);

const TabPanel = props => {
  const {
    children,
    value,
    index,
    idPrefix,
    ariaLabelledByPrefix,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${idPrefix}-${index}`}
      aria-labelledby={`${ariaLabelledByPrefix}-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={0} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PopoverComponent = ({
  id,
  open,
  anchorEl,
  handleClose,
  children,
  leftOrigin = false,
}) => {
  const originSettings = leftOrigin
    ? {
        anchorOrigin: {
          vertical: 'center',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      }
    : {
        anchorOrigin: {
          vertical: 'center',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={originSettings.anchorOrigin}
      transformOrigin={originSettings.transformOrigin}
    >
      <Box>
        <List component="div">{children}</List>
      </Box>
    </Popover>
  );
};

const Snackbar = props => {
  const {
    open,
    onCloseHandler,
    severity,
    children,
    autoHideDuration = 6000,
  } = props;

  return (
    <MUISnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onCloseHandler}
    >
      <Alert onClose={onCloseHandler} severity={severity}>
        {children}
      </Alert>
    </MUISnackbar>
  );
};

export {
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  TabPanel,
  PopoverComponent,
};
