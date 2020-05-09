import React, { useState, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import * as uiActions from '../../Actions/ui-actions';
import { isEmpty } from 'lodash';

const { ConfirmationActions, Locale } = constants;

const MenuList = props => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    menus,
    ui,
    showActionsPopover,
    hideActionsPopover,
    openConfirmationDialog,
    closeConfirmationDialog,
  } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const classes = useStyles();
  const {
    Labels: { Actions: ActionsLabels },
  } = Locale[defaultLanguage];

  const menuActionsPopoverOpen = Boolean(anchorEl);
  const menuActionsPopoverId = menuActionsPopoverOpen
    ? 'menu-actions-popover'
    : undefined;

  const handleMenuActionsClick = useCallback(
    (event, key) => {
      if (!menuActionsPopoverOpen) {
        setAnchorEl(event.currentTarget);
        showActionsPopover({
          data: {
            menuId: key,
          },
        });
      } else {
        setAnchorEl(null);
        hideActionsPopover();
      }
    },
    [ui.actionsPopoverState.data.menuId, menuActionsPopoverOpen]
  );

  useEffect(() => {
    props.getMenus();
  }, []);

  return (
    <>
      <ConfirmationDialog
        open={ui.confirmationDialogState.open}
        action={ConfirmationActions.DELETE_MENU}
        data={
          !isEmpty(ui.confirmationDialogState.data) &&
          ui.confirmationDialogState.data.value.locales[defaultLanguage].name
        }
        handleClose={() =>
          dispatch(closeConfirmationDialog({ open: false, data: null }))
        }
        onConfirm={() => {
          console.log('Action confirmed');
        }}
      />
      <MenuActions
        id={menuActionsPopoverId}
        open={menuActionsPopoverOpen}
        anchorEl={anchorEl}
        handleClose={handleMenuActionsClick}
      >
        <List>
          <ListItem
            aria-label="edit"
            button
            to={`./menu-editor/${ui.actionsPopoverState.data.menuId}`}
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
              const menuId = ui.actionsPopoverState.data.menuId;
              dispatch(hideActionsPopover());
              dispatch(
                openConfirmationDialog({
                  open: true,
                  data: {
                    id: menuId,
                    value: menus[menuId].info,
                  },
                })
              );
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
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, getMenus })(MenuList);
