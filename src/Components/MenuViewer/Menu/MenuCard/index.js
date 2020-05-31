import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

// Style customizations
import { Card, Avatar } from './styles';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';
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
      <Link
        to={`/${business.info.uniqueUrlPath}/menu/${id}`}
        style={{ textDecoration: 'none' }}
      >
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                color={business.theme.colorPalette.primary}
              >
                {getMenuTypeIcon(data.info.type)}
              </Avatar>
            }
            title={data.info.locales[defaultLanguage].name}
            subheader={data.info.setMenu ? `${data.info.setMenu} €` : null}
          />
          <CardMedia
            className={classes.media}
            image={getMenuTypeImage(data.info.type)}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <Truncate lines={6} ellipsis="...">
                {data.info.locales[defaultLanguage].description}
              </Truncate>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
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
