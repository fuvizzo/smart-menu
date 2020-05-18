import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';

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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

export {
  DialogTitle,
  DialogContent,
  DialogActions,
  TabPanel,
  PopoverComponent,
};
