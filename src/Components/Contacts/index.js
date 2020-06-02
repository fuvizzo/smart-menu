import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, Typography, Grid } from '@material-ui/core/';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DialogActions, DialogTitle, DialogContent } from '../Common';
import { useMutation } from '@apollo/react-hooks';
import { SEND_CONTACT_REQUEST } from '../../GraphQL/mutations';
import { contactUs as createContactUsSchema } from '../../Schemas/user';
import ReCAPTCHA from 'react-google-recaptcha';
import constants from '../../Constants';
import { setError } from '../../Actions/ui-actions';
import firebaseService from '../../Firebase';

import CircularProgress from '@material-ui/core/CircularProgress';

const { Locales, RECAPTCHA_KEY } = constants;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
};

const ContactUsDialog = props => {
  const { defaultLanguage, open, onCloseHandler, account } = props;
  const [sendContactRequest, { loading, called, error }] = useMutation(
    SEND_CONTACT_REQUEST
  );
  const [captchaValue, setCaptchaValue] = useState(null);
  const [sent, setAsSent] = useState(false);
  const formValues = { ...initialValues };

  useEffect(() => {
    if (account) {
      formValues.firstName = account.user.firstName;
      formValues.lastName = account.user.lastName;
      formValues.email = account.user.email;
    }
  }, [account, formValues]);

  useEffect(() => {
    setAsSent(!error && !loading && called);
  }, [error, loading, called]);

  const {
    Labels: {
      Account: AccountLabels,
      Actions: ActionLabels,
      Success: SuccessLabels,
      Errors: { GENERIC, FormValidation: FormValidationErrors },
    },
  } = Locales[defaultLanguage];

  const onSubmitClickHandler = async data => {
    let variables;
    if (account) {
      const userIdToken = await firebaseService.auth.currentUser.getIdToken();
      variables = { ...data, userIdToken };
    } else {
      variables = { ...data, captchaValue };
    }
    try {
      await sendContactRequest({ variables });
      setTimeout(() => {
        onCloseHandler();
        setAsSent(false);
      }, 3000);
    } catch (error) {
      props.setError({ message: GENERIC });
    }
  };

  const onChangeCaptchaHandler = value => setCaptchaValue(value);

  return (
    <Dialog
      fullWidth
      onClose={onCloseHandler}
      aria-labelledby="contact-us-dialog-title"
      open={open}
    >
      <DialogTitle id="contact-us-dialog-title" onClose={onCloseHandler}>
        <Typography color="secondary">{ActionLabels.CONTACT_US}</Typography>
      </DialogTitle>
      {sent ? (
        <DialogContent>{SuccessLabels.CONTACT_REQUEST_SENT}</DialogContent>
      ) : (
        <Formik
          initialValues={formValues}
          validationSchema={createContactUsSchema(FormValidationErrors)}
          onSubmit={onSubmitClickHandler}
        >
          {({ submitForm, isSubmitting, values }) => (
            <Form noValidate>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  {!account && (
                    <>
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
                    </>
                  )}
                  <Grid item xs={12}>
                    <Field
                      multiline={true}
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label={ActionLabels.WRITE_SOMETHING_HERE}
                      name="message"
                    />
                  </Grid>
                  {!account && (
                    <Grid item xs={12}>
                      <ReCAPTCHA
                        sitekey={RECAPTCHA_KEY}
                        onChange={onChangeCaptchaHandler}
                      />
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                {loading && <CircularProgress />}
                <Button
                  disabled={loading || !(account || captchaValue)}
                  type="submit"
                  autoFocus
                  color="primary"
                  variant="contained"
                >
                  {ActionLabels.PROCEED}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};
function mapStateToProps(state) {
  return {
    ui: state.ui,
    account: state.account,
  };
}
export default connect(mapStateToProps, { setError })(ContactUsDialog);
