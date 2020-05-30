import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Style customizations
import { StyledCard } from './styles';
import Truncate from "react-truncate";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";
import {getCategoryIcon} from "../../Helpers";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MenuCard(props) {
  const classes = useStyles();
  const {data, defaultLanguage, business, id} = props;

  return (
    <StyledCard className={classes.root}>
      <Link to={`/${business.info.uniqueUrlPath}/menu/${id}`} style={{ textDecoration: 'none' }} >
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {getCategoryIcon(data.info.type)}
              </Avatar>
            }
            title={data.info.locales[defaultLanguage].name}
            subheader={data.info.setMenu ? `${data.info.setMenu} €` : null}
          />
          <CardMedia
            className={classes.media}
            image="https://material-ui.com/static/images/cards/paella.jpg"
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
    </StyledCard>
  );
}

export default MenuCard;
