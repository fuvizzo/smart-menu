import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import { TextValidator } from 'react-material-ui-form-validator';
import constants from '../../Constants/index';
import useStyles from '../Common/styles';
import TextField from '@material-ui/core/TextField';

const { Locale } = constants;
const LocaleEditor = props => {
  const {
    lang,
    defaultLanguage,
    onChangeValue,
    data,
    labels,
    children,
  } = props;
  const {
    Labels: { FormValidationErrors: FormValidationErrorsLabels },
  } = Locale[defaultLanguage];
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl} error={!data.name}>
        <TextValidator
          className={classes.textField}
          label={labels.name}
          name="name"
          onChange={onChangeValue}
          type="text"
          validators={['required']}
          errorMessages={FormValidationErrorsLabels.REQUIRED}
          value={data.name}
          inputProps={{ 'data-lang': lang }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          multiline={true}
          className={classes.textField}
          label={labels.description}
          inputProps={{ 'data-lang': lang }}
          name="description"
          onChange={onChangeValue}
          type="text"
          value={data.description}
        />
      </FormControl>
      {children}
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LocaleEditor);
