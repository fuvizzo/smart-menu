import styled from 'styled-components';
import {Card as MUI_Card, Avatar as MUI_Avatar, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActionArea';

const Card = styled(MUI_Card)`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 410px;
  width: calc(100% - 20px);
  @media (min-width: 500px) {
    width: 50%;
  }
  @media (min-width: 991px) {
    width: calc(33.33% - 20px);
  }
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${props => props.color};
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

const Description = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export { Card, Avatar, CardTitle, StyledLink, StyledCardActionArea, Description };
