import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import MenuImage from '../../Assets/menu.png';
import {
  Card,
  Avatar,
  Switch,
  ListItem,
  FormControlLabel,
  ListItemText,
  ListItemIcon,
  Typography,
  CardHeader,
  Grid,
  Box,
  CardMedia,
  IconButton,
  CardContent,
  CardActions,
} from '@material-ui/core';

import {
  LocalBar as WineChartIcon,
  Fastfood as FoodAndDrinkIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons';

import { PopoverComponent as MenuActionsPopover } from '../Common';
import ConfirmationDialog from './confirmation-dialog';
import { Link as RouterLink } from 'react-router-dom';
import constants from '../../Constants/index';
import { isEmpty } from 'lodash';
import Truncate from 'react-truncate';

import * as uiActions from '../../Actions/ui-actions';
import { deleteMenu, togglePublishedStatus } from '../../Actions/menu-actions';
import useStyles from './styles';

const { ConfirmationActions, Locales } = constants;

const MenuList = props => {
  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] = useState(null);
  const {
    menus,
    ui,
    businesses,
    showActionsPopover,
    hideActionsPopover,
    openConfirmationDialog,
    closeConfirmationDialog,
  } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const classes = useStyles();
  const {
    Labels: {
      Actions: ActionsLabels,
      Menu: MenuLabels,
      Warnings: WarningMessages,
      Hints: HintLabels,
    },
  } = Locales[defaultLanguage];

  const menuActionsPopoverOpen = Boolean(actionPopoverAnchorEl);
  const menuActionsPopoverId = menuActionsPopoverOpen
    ? 'menu-actions-popover'
    : undefined;

  const menuActionsClickHandler = useCallback(
    (event, menuId, businessId) => {
      if (!menuActionsPopoverOpen) {
        setActionPopoverAnchorEl(event.currentTarget);
        showActionsPopover({
          menuId,
          businessId,
        });
      } else {
        setActionPopoverAnchorEl(null);
        hideActionsPopover();
      }
    },
    [ui.actionsPopover.menuId]
  );

  const deleteMenuHandler = useCallback(async menuId => {
    await props.deleteMenu(menuId);
    closeConfirmationDialog();
  }, []);

  const menuKeys = Object.keys(menus);

  const MenuIconType = ({ type }) => {
    switch (type) {
      case 1:
        return <WineChartIcon />;
      default:
        return <FoodAndDrinkIcon />;
    }
  };

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
          handleClose={closeConfirmationDialog}
          onConfirm={() => deleteMenuHandler(ui.confirmationDialog.data.id)}
        />
        <MenuActionsPopover
          id={menuActionsPopoverId}
          open={menuActionsPopoverOpen}
          anchorEl={actionPopoverAnchorEl}
          handleClose={menuActionsClickHandler}
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
          <ListItem
            aria-label="edit"
            button
            onClick={() => {
              const { menuId, businessId } = ui.actionsPopover;
              const business = businessId
                ? businesses[businessId]
                : Object.values(businesses)[0];
              const menuPreviewPath = business.info.uniqueUrlPath;
              window.open(`/menu-preview/${menuPreviewPath}?menu-id=${menuId}`);
              hideActionsPopover();
              setActionPopoverAnchorEl(null);
            }}
            component={RouterLink}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={ActionsLabels.PREVIEW} />
          </ListItem>
        </MenuActionsPopover>
        {menuKeys.length === 0 ? (
          <Grid item xs={12}>
            <Card width={1} elevation={2} className={classes.emptyMenuList}>
              <Box pt={2}>
                <Typography color="textPrimary" align="center">
                  {MenuLabels.EMPTY_MENU_LIST}
                </Typography>

                <Typography color="textSecondary" align="center">
                  {HintLabels.ADD_MENU}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ) : (
          menuKeys.map(key => {
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
                        <MenuIconType type={menu.info.type} />
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-describedby={menuActionsPopoverId}
                        onClick={event =>
                          menuActionsClickHandler(event, key, menu.businessId)
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <Typography
                        color={
                          menu.info.locales[defaultLanguage].name ===
                          WarningMessages.MISSING_NAME
                            ? 'secondary'
                            : 'initial'
                        }
                      >
                        {menu.info.locales[defaultLanguage].name}
                      </Typography>
                    }
                    subheader={
                      menu.info.setMenu ? (
                        <div>
                          <span style={{ color: '#3f51b5' }}>
                            {MenuLabels.SET_MENU}:{' '}
                          </span>
                          <span>{`${menu.info.setMenu}€`}</span>
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
                        {menu.info.locales[defaultLanguage].description ||
                          WarningMessages.getMissingFieldDetailedMessage(
                            MenuLabels.DESCRIPTION
                          )}
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
          })
        )}
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    businesses: state.businesses,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, {
  ...uiActions,
  ...{
    deleteMenu,
    togglePublishedStatus,
  },
})(MenuList);
