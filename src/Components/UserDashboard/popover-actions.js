import React from 'react';

import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';

const PopoverActions = ({ id, open, anchorEl, handleClose, children }) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box>
        <List component="div">{children}</List>
      </Box>
    </Popover>
  );
};

export default PopoverActions;
