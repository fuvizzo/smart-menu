import React from 'react';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      SmartMenoos {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
