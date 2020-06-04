import styled from 'styled-components';
import { Box, Button, Grid, Avatar } from '@material-ui/core';
import { Form } from 'formik';

const PasswordResetDialogContent = styled(Box)`
  min-width: 300px;
`;

const StyledForm = styled(Form)`  
  width: '100%', // Fix IE 11 issue.
  margin-top: 8px,
`;

const SubmitButton = styled(Button)`
  margin: 24px 0px 16px;
`;

const SelectorWrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
  }
`;

const RootGrid = styled(Grid)`
  height: 100vh;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  background-color: #f50057;
`;

const FormWrapper = styled.div`
  margin: 32px 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export {
  PasswordResetDialogContent,
  StyledForm,
  SubmitButton,
  SelectorWrapper,
  RootGrid,
  Image,
  StyledAvatar,
  FormWrapper,
};
