import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  CardHeader,
  CardMedia,
  CardContent,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import {
  Card,
  Avatar,
  CardTitle,
  StyledLink,
  StyledCardActionArea,
  Description,
} from './styles';

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
  const locale = data.info.locales[defaultLanguage];

  return locale ? (
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
                {locale.name}
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
              <Description>
                {locale.description}
              </Description>
            </Typography>
          </CardContent>
        </StyledCardActionArea>
      </StyledLink>
    </Card>
  ) : null;
}

export default MenuCard;
