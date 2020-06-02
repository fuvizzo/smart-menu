import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import {
  Card,
  Avatar,
  CardTitle,
  StyledLink,
  StyledCardActionArea,
} from './styles';
import Truncate from 'react-truncate';

import { getMenuTypeIcon, getMenuTypeImage } from '../../Helpers';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function MenuCard(props) {
  const classes = useStyles();
  const { data, defaultLanguage, business, id } = props;

  return (
    <Card className={classes.root}>
      <StyledLink to={`menu/${id}`} style={{ textDecoration: 'none' }}>
        <StyledCardActionArea>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                color={business.theme.colorPalette.primary}
              >
                {getMenuTypeIcon(data.info.type)}
              </Avatar>
            }
            title={
              <CardTitle color={business.theme.colorPalette.secondary}>
                {data.info.locales[defaultLanguage].name}
              </CardTitle>
            }
            subheader={data.info.setMenu ? `${data.info.setMenu} €` : null}
          />
          <CardMedia
            className={classes.media}
            image={getMenuTypeImage(data.info.type)}
            style={{ width: '100%' }}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <Truncate lines={6} ellipsis="...">
                {data.info.locales[defaultLanguage].description}
              </Truncate>
            </Typography>
          </CardContent>
        </StyledCardActionArea>
      </StyledLink>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MenuCard;
