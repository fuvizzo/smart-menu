import React from 'react';
import { Typography, Grid, Paper, Box } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { RootGrid, Image, StyledAvatar, FormWrapper } from './styles';
import LoginImage from '../../Assets/login-wallpaper.jpg';
import CopyAndLang from '../Common/copy-and-lang';

const AuthSectionContainer = props => {
  const { sectionLabel, children } = props;

  return (
    <RootGrid container component="main">
      <Grid item xs={false} sm={4} md={7}>
        <Image src={LoginImage} alt="login-wallpaper" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <FormWrapper>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            {sectionLabel}
          </Typography>
          <Box mt={2}>{children}</Box>
        </FormWrapper>
        <Box m={5}>
          <CopyAndLang />
        </Box>
      </Grid>
    </RootGrid>
  );
};

export default AuthSectionContainer;
