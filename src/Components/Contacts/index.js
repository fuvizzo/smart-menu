import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, Box, Typography, Grid } from '@material-ui/core/';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { DialogActions, DialogTitle, DialogContent } from '../Common';
import { useMutation } from '@apollo/react-hooks';
import { SEND_CONTACT_REQUEST } from '../../GraphQL/mutations';
import { contactUs as createContactUsSchema } from '../../Schemas/user';
import ReCAPTCHA from 'react-google-recaptcha';
import constants from '../../Constants';
import { setError } from '../../Actions/ui-actions';
const { Locales, RECAPTCHA_KEY } = constants;

const initialValues = {
  firstName: 'Fulvio',
  lastName: 'Cusimano',
  email: 'foo@foo.foo',
  message: 'Message',
};

const ContactUsDialog = props => {
  const { defaultLanguage, open, onCloseHandler } = props;
  const [sendContactRequest] = useMutation(SEND_CONTACT_REQUEST);
  const [captchaValue, setCaptchaValue] = useState(null);

  const {
    Labels: {
      Account: AccountLabels,
      Actions: ActionLabels,

      Errors: { GENERIC, FormValidation: FormValidationErrors },
    },
  } = Locales[defaultLanguage];

  const onSubmitClickHandler = async data => {
    const variables = { ...data, captchaValue };
    console.log(variables);
    try {
      await sendContactRequest({ variables });
    } catch (error) {
      props.setError({ message: GENERIC });
    }
  };

  const onChangeCaptchaHandler = value => setCaptchaValue(value);

  return (
    <Dialog
      onClose={onCloseHandler}
      aria-labelledby="contact-us-dialog-title"
      open={open}
    >
      <DialogTitle id="contact-us-dialog-title" onClose={onCloseHandler}>
        <Typography color="secondary">{ActionLabels.CONTACT_US}</Typography>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={createContactUsSchema(FormValidationErrors)}
        onSubmit={onSubmitClickHandler}
      >
        {({ submitForm, isSubmitting, values }) => (
          <Form noValidate>
            <DialogContent dividers>
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
                    multiline={true}
                    component={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label={ActionLabels.WRITE_SOMETHING_HERE}
                    name="message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_KEY}
                    onChange={onChangeCaptchaHandler}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
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
    </Dialog>
  );
};
function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps, { setError })(ContactUsDialog);
