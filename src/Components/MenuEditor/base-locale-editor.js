import React from 'react';
import { connect } from 'react-redux';
import { TextValidator } from 'react-material-ui-form-validator';
import constants from '../../Constants/index';
import { FormControl } from '../Common/styles';
import TextField from '@material-ui/core/TextField';

const { Locales } = constants;
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
    Labels: {
      Errors: { FormValidation: FormValidationErrors },
    },
  } = Locales[defaultLanguage];

  return (
    <>
      <FormControl>
        <TextValidator
          label={labels.name}
          name="name"
          onChange={onChangeValue}
          type="text"
          validators={['required']}
          errorMessages={FormValidationErrors.REQUIRED}
          value={data.name}
          inputProps={{ 'data-lang': lang }}
        />
      </FormControl>
      <FormControl>
        <TextField
          multiline={true}
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
