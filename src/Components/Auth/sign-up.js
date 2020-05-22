import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import {
  Container,
  Typography,
  MenuItem,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  Avatar,
  Button,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import { signUp as createSignUpSchema } from '../../Schemas/account';
import constants from '../../Constants/index';
import { signUp } from '../../Actions/index';
import Copyright from '../Common/copyright';
import useStyles from './styles';

const { Locales } = constants;

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
      Business: BusinessLabels,
      Hints: HintLabels,
      FormValidationErrors,
    },
    BUSINESS_TYPES: BusinessTypes,
  } = locale;

  const onSignUpClickHandler = async (data, { setSubmitting }) => {
    setSubmitting(false);

    await props.signUp(data);
    history.push('dashboard/menu-list');
  };

  const initialValues = {
    firstName: 'Marco',
    lastName: 'Boldrini',
    email: 'marco.boldrini@gmail.com',
    passord: '12345678',
    businessName: 'Momenti',
    businessType: '0',
  };
  return (
    <Container component="main" maxWidth="xs">
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
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete="bname"
                    name="businessName"
                    variant="outlined"
                    fullWidth
                    id="businessName"
                    label={BusinessLabels.NAME}
                    autoFocus
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

export default connect(mapStateToProps, { signUp })(SignUp);
