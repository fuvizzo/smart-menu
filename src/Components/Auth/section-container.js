import React from 'react';
import { Avatar, Typography, Grid, Paper } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import LoginImage from '../../Assets/login-wallpaper.jpg';

const AuthSectionContainer = props => {
  const { sectionLabel, children } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={LoginImage} alt="login-wallpaper" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {sectionLabel}
          </Typography>
          {children}
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthSectionContainer;
