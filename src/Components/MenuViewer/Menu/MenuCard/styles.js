import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledCard = styled(Card)`
  margin: 10px;
  max-width: 100%;
  min-width: 280px;
  @media (min-width: 768px) {
    max-width: 280px;
  }
`;

export { StyledCard };
