import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
  Paper,
  Container,
  Typography,
  Toolbar,
  AppBar,
  Box,
  Drawer,
  IconButton,
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';

import Copyright from '../Common/copyright';
import { Snackbar } from '../Common';
import constants from '../../Constants';
import { setDashboardDrawerOpen, setError } from '../../Actions/ui-actions';
import useStyles from './styles';

const { ErrorTypes } = constants;

const Dashboard = props => {
  const {
    ui: { dashboardDrawerOpen: open, error },
    children,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {error.type === ErrorTypes.SERVER_ERROR && (
        <Snackbar
          severity="warning"
          onCloseHandler={() => {
            props.setError();
          }}
          open={!!error}
        >
          {error.message}
        </Snackbar>
      )}
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.setDashboardDrawerOpen(!open)}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {props.sectionHeader}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Box>
          <Box p={2}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.logo}
            >
              Smart Menu!!
            </Typography>
          </Box>
          {props.leftMenu}
        </Box>
      </Drawer>

      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Paper>{children}</Paper>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { setDashboardDrawerOpen, setError })(
  Dashboard
);
