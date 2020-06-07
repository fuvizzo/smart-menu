import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, LinearProgress } from '@material-ui/core';

import { Formik, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { StyledForm, SubmitButton } from './styles';
import constants from '../../Constants/index';
import { resetPassword } from '../../Actions/index';
import { resetPassword as createResetPasswordSchema } from '../../Schemas/user';

const { Locales } = constants;

const initialValues = {
  password: '',
  confirmPassword: '',
};
const ResetPassword = props => {
  const {
    authOperation: { email, actionCode },
  } = props;
  const history = useHistory();

  const {
    Labels: {
      Account: AccountLabels,
      Actions: ActionLabels,

      Errors: { FormValidation: FormValidationErrors },
    },
  } = Locales[props.defaultLanguage];

  const onSubmitClickHandler = (data, { setSubmitting }) => {
    const submit = async () => {
      const isAuthenticated = await props.resetPassword(
        actionCode,
        data.password,
        email
      );
      setSubmitting(false);
      if (isAuthenticated) history.push('/dashboard/menu-list');
    };
    submit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createResetPasswordSchema(FormValidationErrors)}
      onSubmit={onSubmitClickHandler}
      validate={values => console.log(values)}
    >
      {({ submitForm, isSubmitting, values }) => (
        <StyledForm noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                type="password"
                required
                fullWidth
                id="email"
                label={AccountLabels.PASSWORD}
                name="password"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                name="confirmPassword"
                label={AccountLabels.CONFIRM_PASSWORD}
                type="password"
                id="confirm-password"
              />
            </Grid>
          </Grid>
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {ActionLabels.PROCEED}
          </SubmitButton>
          {isSubmitting && <LinearProgress />}
        </StyledForm>
      )}
    </Formik>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.public.ui.settings.defaultLanguage,
    authOperation: state.public.authOperation,
  };
}

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
