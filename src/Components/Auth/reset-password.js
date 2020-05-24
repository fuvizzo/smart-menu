import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import useStyles from './styles';
import constants from '../../Constants/index';
import { resetPassword } from '../../Actions/index';
import { resetPassword as createResetPasswordSchema } from '../../Schemas/account';

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

      FormValidationErrors,
    },
  } = Locales[props.defaultLanguage];

  const classes = useStyles();

  const onSubmitClickHandler = async (data, { setSubmitting }) => {
    setSubmitting(false);
    const isAuthenticated = await props.resetPassword(
      actionCode,
      data.password,
      email
    );
    if (isAuthenticated) history.push('/dashboard/menu-list');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createResetPasswordSchema(FormValidationErrors)}
      onSubmit={onSubmitClickHandler}
      validate={values => console.log(values)}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form className={classes.form} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {ActionLabels.PROCEED}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
    authOperation: state.public.authOperation,
  };
}

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
