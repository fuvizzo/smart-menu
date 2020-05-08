import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getMenus } from '../../Actions/menuActions';
import { useEffect } from 'react';
import MenuImage from '../../Assets/menu.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import constants from '../../Constants/index';
import useStyles from './styles';

const { LOCALE } = constants;

const PopOverActions = ({ id, open, anchorEl, handleClose, menuId }) => {
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
        <List>
          <ListItem
            aria-label="edit"
            button
            to={`./menu-editor/${menuId}`}
            component={RouterLink}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItem>
          <ListItem aria-label="delete" button>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Box>
    </Popover>
  );
};

const MenuList = props => {
  const defaultState = { anchorEl: null, menuId: null };
  const { getMenus, defaultLanguage, menus } = props;
  const classes = useStyles();

  const [state, setState] = useState(defaultState);
  const open = Boolean(state.anchorEl);
  const id = open ? 'simple-popover' : undefined;
  useEffect(() => {
    getMenus();
  }, []);

  const handleClick = (event, key) => {
    setState({ anchorEl: event.target, menuId: key });
  };

  const handleClose = () => {
    setState(defaultState);
  };

  return (
    <>
      <PopOverActions
        id={id}
        menuId={state.menuId}
        open={open}
        anchorEl={state.anchorEl}
        handleClose={handleClose}
      />
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {Object.keys(menus).map(key => {
          const menu = menus[key];
          return (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Card className={classes.root}>
                <CardHeader
                  className={classes.header}
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      M
                    </Avatar>
                  }
                  action={
                    <IconButton
                      aria-describedby={id}
                      onClick={event => handleClick(event, key)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={menu.info.name}
                  subheader={
                    menu.info.setMenu
                      ? `Set menu: ${menu.info.setMenu}`
                      : 'normal menu'
                  }
                />

                <CardMedia
                  className={classes.media}
                  image={MenuImage}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {menu.info.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  getMenus,
})(MenuList);
