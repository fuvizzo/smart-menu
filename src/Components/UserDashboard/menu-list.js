import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import MenuImage from '../../Assets/menu.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

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
import MenuActions from './popover-actions';
import ConfirmationDialog from './confirmation-dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link as RouterLink } from 'react-router-dom';
import constants from '../../Constants/index';

import { isEmpty } from 'lodash';
import Truncate from 'react-truncate';

import * as uiActions from '../../Actions/ui-actions';
import { getMenus, togglePublishedStatus } from '../../Actions/menu-actions';
import useStyles from './styles';

const { ConfirmationActions, Locale } = constants;

const MenuList = props => {
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
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
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },
  } = Locale[defaultLanguage];

  const menuActionsPopoverOpen = Boolean(actionPopoverAnchorEl);
  const menuActionsPopoverId = menuActionsPopoverOpen
    ? 'menu-actions-popover'
    : undefined;

  const handleMenuActionsClick = useCallback(
    (event, key) => {
      if (!menuActionsPopoverOpen) {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover({
          menuId: key,
        });
      } else {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      }
    },
    [ui.actionsPopover.menuId]
  );

  useEffect(() => {
    props.getMenus();
  }, []);

  return (
    <Box p={2}>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <ConfirmationDialog
          open={ui.confirmationDialog.open}
          action={ConfirmationActions.DELETE_MENU}
          data={
            !isEmpty(ui.confirmationDialog.data) &&
            ui.confirmationDialog.data.value.locales[defaultLanguage].name
          }
          handleClose={() =>
            closeConfirmationDialog({ open: false, data: null })
          }
          onConfirm={() => {
            console.log('Action confirmed');
          }}
        />
        <MenuActions
          id={menuActionsPopoverId}
          open={menuActionsPopoverOpen}
          anchorEl={actionPopoverAnchorEl}
          handleClose={handleMenuActionsClick}
        >
          <ListItem
            aria-label="edit"
            button
            to={`./menu-editor/${ui.actionsPopover.menuId}`}
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
              const menuId = ui.actionsPopover.menuId;
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
              openConfirmationDialog({
                id: menuId,
                value: menus[menuId].info,
              });
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.DELETE} />
          </ListItem>
        </MenuActions>

        {Object.keys(menus).map(key => {
          const menu = menus[key];
          return (
            <Grid
              className={classes.cardGrid}
              item
              xs={12}
              sm={6}
              md={3}
              key={key}
            >
              <Card width={1} elevation={2} className={classes.root}>
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
                    menu.info.setMenu ? (
                      <div>
                        <span style={{ color: '#3f51b5' }}>
                          {MenuLabels.SET_MENU}:{' '}
                        </span>
                        <span>{menu.info.setMenu}</span>
                      </div>
                    ) : (
                      MenuLabels.MENU
                    )
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
                    className={classes.descriptionParagraph}
                  >
                    <Truncate lines={4} ellipsis="...">
                      {menu.info.locales[defaultLanguage].description}
                    </Truncate>
                  </Typography>
                </CardContent>

                <CardActions disableSpacing>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={menu.published}
                        onChange={() =>
                          props.togglePublishedStatus(key, !menu.published)
                        }
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2" color="textSecondary">
                        {menu.published
                          ? MenuLabels.PUBLISHED
                          : MenuLabels.UNPUBLISHED}
                      </Typography>
                    }
                  />
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, {
  ...uiActions,
  ...{
    getMenus,
    togglePublishedStatus,
  },
})(MenuList);
