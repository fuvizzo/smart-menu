import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { signUp as createSignUpSchema } from '../../Schemas/account';
import constants from '../../Constants/index';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../../Actions/index';
import Copyright from '../Common/copyright';

const { Locales } = constants;

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = props => {
  const { signUp, defaultLanguage } = props;
  const classes = useStyles();
  const history = useHistory();
  const locale = Locales[defaultLanguage];
  const {
    Labels: {
      Account: AccountLabels,
      Sections: SectionLabels,
      Actions: ActionLabels,
      Hints: HintLabels,
      FormValidationErrors,
    },
  } = locale;

  const onSignUpClickHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    const { firstName, lastName, email, password } = values;
    await signUp(firstName, lastName, email, password);
    history.push('dashboard/menu-list');
  };

  const initialValues = {
    firstName: 'Marco',
    lastName: 'Boldrini',
    email: 'marco.boldrini@gmail.com',
    passord: '12345678',
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {SectionLabels.SIGN_UP}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={createSignUpSchema(FormValidationErrors)}
          onSubmit={onSignUpClickHandler}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label={AccountLabels.FIRST_NAME}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label={AccountLabels.LAST_NAME}
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label={AccountLabels.EMAIL_ADDRESS}
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    name="password"
                    label={AccountLabels.PASSWORD}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label={AccountLabels.NEWS_LETTER}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {ActionLabels.SIGN_UP}
              </Button>
            </Form>
          )}
        </Formik>

        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/sign-in" component={RouterLink} variant="body2">
              {HintLabels.SIGN_IN}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.public.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, userActions)(SignUp);
