import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Link,
  Checkbox,
  Button,
  FormControlLabel,
} from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import PasswordResetDialog from './password-reset-dialog';
import useStyles from './styles';
import constants from '../../Constants/index';
import { signInWithEmailAndPassword } from '../../Actions/index';
import { signIn as createSignInSchema } from '../../Schemas/account';

const { Locales } = constants;

const initialValues = {
  email: '',
  password: '',
};
const SignIn = props => {
  const [passwordResetDialogOpen, setPasswordResetDialogOpen] = useState(false);
  const history = useHistory();

  const {
    Labels: {
      Account: AccountLabels,
      Actions: ActionLabels,
      Hints: HintLabels,
      FormValidationErrors,
    },
  } = Locales[props.defaultLanguage];

  const classes = useStyles();

  const onSubmitClickHandler = async (data, { setSubmitting }) => {
    setSubmitting(false);
    const isAuthenticated = await props.signInWithEmailAndPassword(data);
    if (isAuthenticated) history.push('/dashboard/menu-list');
  };

  return (
    <>
      <PasswordResetDialog
        open={passwordResetDialogOpen}
        onCloseHandler={() => setPasswordResetDialogOpen(false)}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={createSignInSchema(FormValidationErrors)}
        onSubmit={onSubmitClickHandler}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={AccountLabels.EMAIL_ADDRESS}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  name="password"
                  label={AccountLabels.PASSWORD}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {ActionLabels.SIGN_IN}
            </Button>
          </Form>
        )}
      </Formik>
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
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
    error: state.ui.error,
  };
}

export default connect(mapStateToProps, { signInWithEmailAndPassword })(SignIn);
