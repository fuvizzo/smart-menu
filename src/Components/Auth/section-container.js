import React from 'react';
import { Avatar, Typography, Grid, Paper, Box } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import LoginImage from '../../Assets/login-wallpaper.jpg';
import Copyright from '../Common/copyright';

const AuthSectionContainer = props => {
  const { sectionLabel, children } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7}>
        <img src={LoginImage} className={classes.image} alt="login-wallpaper" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {sectionLabel}
          </Typography>
          <Box mt={2}>{children}</Box>
        </div>
        <Box m={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthSectionContainer;
