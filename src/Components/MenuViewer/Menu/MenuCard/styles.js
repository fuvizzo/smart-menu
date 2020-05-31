import styled from 'styled-components';
import { Card as MUI_Card, Avatar as MUI_Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CardActions from "@material-ui/core/CardActionArea";

const Card = styled(MUI_Card)`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 280px;
  }
`;

const Avatar = styled(MUI_Avatar)`
  background-color: ${props => props.color};
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledCardActionArea = styled(CardActions)`
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
`;

export { Card, Avatar, StyledLink, StyledCardActionArea };
