import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core/';

export const DialogContentBox = styled(Box)`
  min-width: 140px;
`;

export const DialogContentBoxWrapper = styled(Box)`
  display: flexk;
`;

export const MenuPagePublicURL = styled(Typography)`
  text-decoration: none;
  max-width: 250px;
  display: block;
  margin-right: 10px;
  word-break: break-word;
`;

export const StyledEm = styled.em`
  font-weight: bold;
`;

export const AdviceTypography = styled(Typography)`
  font-size: 0.8rem;
`;

export const ActionLink = styled(Typography)`
  text-decoration: none;
  font-size: 0.8rem;
`;
