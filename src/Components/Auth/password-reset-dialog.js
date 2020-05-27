import React from 'react';
import { connect } from 'react-redux';
import constants from '../../Constants';
import { Dialog, Typography, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { PasswordResetDialogContent } from './styles';
import { DialogTitle, DialogContent, DialogActions } from '../Common';
import { email as createEmailSchema } from '../../Schemas/account';
import { submitResetPasswordRequest } from '../../Actions';
const PasswordResetDialog = props => {
  const { open, onCloseHandler, defaultLanguage } = props;

  const { Locales } = constants;
  const {
    Labels: {
      Actions: ActionsLabels,
      Account: AccountLabels,
      Hints,
      Errors: { FormValidation: FormValidationErrors },
    },
  } = Locales[defaultLanguage];

  const onSubmitHandler = async (data, { setSubmitting }) => {
    setSubmitting(false);

    await props.submitResetPasswordRequest(data.email);
    onCloseHandler();
  };

  return (
    <Dialog
      onClose={onCloseHandler}
      aria-labelledby="password-reset-dialog-title"
      open={open}
    >
      <Formik
        initialValues={{ email: '' }}
        validationSchema={createEmailSchema(FormValidationErrors)}
        onSubmit={onSubmitHandler}
        onError={errors => console.log(errors)}
      >
        {({ submitForm, isSubmitting, values, errors }) => (
          <Form>
            <DialogTitle
              id="password-reset-dialog-title"
              onClose={onCloseHandler}
            >
              <Typography color="secondary">
                {Hints.PASSWORD_FORGOTTEN}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <PasswordResetDialogContent>
                <Field
                  component={TextField}
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label={AccountLabels.EMAIL_ADDRESS}
                />
              </PasswordResetDialogContent>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                type="submit"
                autoFocus
                color="primary"
                variant="contained"
              >
                {ActionsLabels.PROCEED}
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
    defaultLanguage: state.public.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps, { submitResetPasswordRequest })(
  PasswordResetDialog
);
