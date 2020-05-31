import styled from 'styled-components';
import { Card as MUI_Card, Avatar as MUI_Avatar } from '@material-ui/core';

const Card = styled(MUI_Card)`
  margin: 10px;
  max-width: 100%;
  min-width: 280px;
  @media (min-width: 768px) {
    max-width: 280px;
  }
`;

const Avatar = styled(MUI_Avatar)`
  background-color: ${props => props.color};
`;

export { Card, Avatar };
