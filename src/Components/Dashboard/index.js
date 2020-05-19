import React, { useEffect } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';

import Copyright from '../Common/copyright';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { setDashboardDrawerOpen } from '../../Actions/ui-actions';
import useStyles from './styles';

import LeftMenu from './left-menu';
const Dashboard = props => {
  console.count('Dashboard renders');
  const { ui, children } = props;
  const open = ui.dashboardDrawerOpen;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
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
          <LeftMenu />
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

export default connect(mapStateToProps, { setDashboardDrawerOpen })(Dashboard);
