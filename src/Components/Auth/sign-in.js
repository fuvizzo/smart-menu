import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  Link,
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import PasswordResetDialog from './password-reset-dialog';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import constants from '../../Constants/index';
import * as userActions from '../../Actions/index';
import LoginImage from '../../Assets/login-wallpaper.jpg';
import Copyright from '../Common/copyright';

const { Locales } = constants;

const emptySignInState = {
  email: 'fulvio.cusimano@gmail.com',
  password: 'password',
};
const SignIn = props => {
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);
  const history = useHistory();
  console.log(process.env.REACT_APP_BACK_END_URL);
  const {
    Labels: {
      Account: AccountLabels,
      Sections: SectionLabels,
      Actions: ActionLabels,
      Hints: HintLabels,
    },
  } = Locales[props.defaultLanguage];

  const classes = useStyles();
  const [loginData, setLoginData] = useState(emptySignInState);

  const { signInWithEmailAndPassword } = props;
  const loginHandler = useCallback(
    async event => {
      event.preventDefault();
      await signInWithEmailAndPassword(loginData.email, loginData.password);
      history.push('dashboard/menu-list');
    },
    [loginData]
  );

  const onChangeValueHandler = useCallback(
    event => {
      setLoginData({ ...loginData, [event.target.name]: event.target.value });
    },
    [loginData]
  );
  return (
    <>
      <PasswordResetDialog
        open={passwordResetDialogOpen}
        onCloseHandler={() => setPasswordResetDialogOpen(false)}
      />
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label={AccountLabels.EMAIL_ADDRESS}
          name="email"
          onChange={onChangeValueHandler}
          value={loginData.email}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={onChangeValueHandler}
          value={loginData.password}
          name="password"
          label={AccountLabels.PASSWORD}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          onClick={loginHandler}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {ActionLabels.SIGN_IN}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              href="#"
              onClick={event => {
                event.preventDefault();
                setPasswordResetDialogOpen(true);
              }}
              variant="body2"
            >
              {HintLabels.PASSWORD_FORGOTTEN}
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="/authentication/sign-up"
              component={RouterLink}
              variant="body2"
            >
              {HintLabels.SIGN_UP}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, userActions)(SignIn);
