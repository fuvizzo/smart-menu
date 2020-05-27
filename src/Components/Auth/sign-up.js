import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import {
  MenuItem,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { signUp as createSignUpSchema } from '../../Schemas/account';
import constants from '../../Constants/index';
import { signUp } from '../../Actions/index';
import useStyles from './styles';

const { Locales } = constants;

const SignUp = props => {
  const { defaultLanguage } = props;
  const classes = useStyles();
  const history = useHistory();
  const locale = Locales[defaultLanguage];
  const {
    Labels: {
      Account: AccountLabels,
      Actions: ActionLabels,
      Business: BusinessLabels,
      Hints: HintLabels,
      Errors: { FormValidation: FormValidationErrors },
    },
    BUSINESS_TYPES: BusinessTypes,
  } = locale;

  const onSubmitClickHandler = async (data, { setSubmitting }) => {
    setSubmitting(false);
    const isAuthenticated = await props.signUp(data);
    if (isAuthenticated) history.push('/dashboard/menu-list');
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    passord: '',
    businessName: '',
    businessType: '0',
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={createSignUpSchema(FormValidationErrors)}
        onSubmit={onSubmitClickHandler}
      >
        {({ submitForm, isSubmitting }) => (
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="businessName"
                  variant="outlined"
                  fullWidth
                  id="businessName"
                  label={BusinessLabels.NAME}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.selectorWrapper}>
                <Field
                  component={TextField}
                  select
                  variant="outlined"
                  label={BusinessLabels.TYPE}
                  name="businessType"
                >
                  {BusinessTypes.map((businessType, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {businessType}
                      </MenuItem>
                    );
                  })}
                </Field>
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
          <Link
            to="/authentication/sign-in"
            component={RouterLink}
            variant="body2"
          >
            {HintLabels.SIGN_IN}
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.public.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, { signUp })(SignUp);
