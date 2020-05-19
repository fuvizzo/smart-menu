import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import constants from '../../Constants/index';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../Actions/index';
import LoginImage from '../../Assets/login-wallpaper.jpg';
import Copyright from '../Common/copyright';

const { Locales } = constants;

const emptySignInState = {
  email: 'fulvio.cusimano@gmail.com',
  password: 'password',
};
const SignIn = props => {
  console.count('SignIn renders');
  const history = useHistory();
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
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={LoginImage} alt="login-wallpaper" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {SectionLabels.SIGN_IN}
          </Typography>
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
                <Link href="#" variant="body2">
                  {HintLabels.PASSWORD_FORGOTTEN}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" component={RouterLink} variant="body2">
                  {HintLabels.SIGN_UP}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, userActions)(SignIn);
