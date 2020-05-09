import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { getMenus } from '../../Actions/menuActions';
import { useEffect } from 'react';
import MenuImage from '../../Assets/menu.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';
import MenuActions from './popoverActions';
import ConfirmationDialog from './confirmationDialog';
import { Link as RouterLink } from 'react-router-dom';
import constants from '../../Constants/index';

const { ConfirmationActions, Locale } = constants;

const MenuList = props => {
  const defaultMenuActionsState = { anchorEl: null, menuId: null };
  const { menus, defaultLanguage } = props;
  const classes = useStyles();
  const {
    Labels: { Actions: ActionsLabels },
  } = Locale[defaultLanguage];
  const defaultConfirmationDialogState = {
    open: false,
    item: null,
  };
  const [confirmationDialogState, setConfirmationDialogState] = useState(
    defaultConfirmationDialogState
  );

  const [menuActionsPopoverState, setMenuActionsPopoverState] = useState(
    defaultMenuActionsState
  );
  const menuActionsPopoverOpen = Boolean(menuActionsPopoverState.anchorEl);
  const menuActionsPopoverId = menuActionsPopoverOpen
    ? 'menu-actions-popover'
    : undefined;

  const handleMenuActionsClick = useCallback(
    (event, key) => {
      setMenuActionsPopoverState(
        !menuActionsPopoverOpen
          ? { anchorEl: event.target, menuId: key }
          : defaultMenuActionsState
      );
    },
    [menuActionsPopoverState.menuId]
  );

  useEffect(() => {
    props.getMenus();
  }, []);

  return (
    <>
      <ConfirmationDialog
        open={confirmationDialogState.open}
        action={ConfirmationActions.DELETE_MENU}
        data={
          confirmationDialogState.item &&
          confirmationDialogState.item.value.locales[defaultLanguage].name
        }
        handleClose={() => setConfirmationDialogState(false)}
        onConfirm={() => {
          console.log('Action confirmed');
        }}
      />
      <MenuActions
        id={menuActionsPopoverId}
        open={menuActionsPopoverOpen}
        anchorEl={menuActionsPopoverState.anchorEl}
        handleClose={handleMenuActionsClick}
      >
        <List>
          <ListItem
            aria-label="edit"
            button
            to={`./menu-editor/${menuActionsPopoverState.menuId}`}
            component={RouterLink}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.EDIT} />
          </ListItem>
          <ListItem
            aria-label="delete"
            button
            onClick={() => {
              const menuId = menuActionsPopoverState.menuId;
              setMenuActionsPopoverState(defaultMenuActionsState);
              setConfirmationDialogState({
                open: true,
                item: {
                  id: menuId,
                  value: menus[menuId].info,
                },
              });
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.DELETE} />
          </ListItem>
        </List>
      </MenuActions>
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
                      aria-describedby={menuActionsPopoverId}
                      onClick={event => handleMenuActionsClick(event, key)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={menu.info.locales[defaultLanguage].name}
                  subheader={
                    menu.info.setMenu
                      ? `TRANSLATION NEEDED -> Set menu: ${menu.info.setMenu}`
                      : 'TRANSLATION NEEDED -> normal menu'
                  }
                />

                <CardMedia
                  className={classes.media}
                  image={MenuImage}
                  title={menu.info.locales[defaultLanguage].name}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {menu.info.locales[defaultLanguage].description}
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
