import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import {
  MenuItem,
  Grid,
  Link,
  Checkbox,
  LinearProgress,
  FormControlLabel,
} from '@material-ui/core';

import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { signUp as createSignUpSchema } from '../../Schemas/user';
import constants from '../../Constants/index';
import { signUp } from '../../Actions/index';

import { StyledForm, SubmitButton, SelectorWrapper } from './styles';

const { Locales } = constants;

const SignUp = props => {
  const { defaultLanguage } = props;
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

  const onSubmitClickHandler = (data, { setSubmitting }) => {
    const submit = async () => {
      const isAuthenticated = await props.signUp(data);
      setSubmitting(false);
      if (isAuthenticated) history.push('/dashboard/menu-list');
    };
    submit();
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    passord: '',
    businessName: '',
    businessType: 0,
    allowExtraEmails: true,
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={createSignUpSchema(FormValidationErrors)}
        onSubmit={onSubmitClickHandler}
      >
        {({ submitForm, isSubmitting, values, setFieldValue }) => (
          <StyledForm>
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
              <Grid item xs={12} sm={6}>
                <SelectorWrapper>
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
                </SelectorWrapper>
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
                  control={<Checkbox />}
                  onChange={() =>
                    setFieldValue('allowExtraEmails', !values.allowExtraEmails)
                  }
                  checked={values.allowExtraEmails}
                  color="primary"
                  label={AccountLabels.NEWS_LETTER}
                />
              </Grid>
            </Grid>
            <SubmitButton
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              {ActionLabels.SIGN_UP}
            </SubmitButton>
            {isSubmitting && <LinearProgress />}
          </StyledForm>
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
