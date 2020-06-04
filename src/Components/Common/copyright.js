import React from 'react';
import { Typography, Link } from '@material-ui/core';

import { Link as RouterDomLink } from 'react-router-dom';
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="secondary" component={RouterDomLink} to="/">
        <span>SmartMenoos</span>
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
