import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';

import Box from '@material-ui/core/Box';
import constants from '../../Constants/index';
import useStyles from '../Common/styles';
import TextField from '@material-ui/core/TextField';

const { Locale } = constants;
const LocaleEditor = props => {
  const { index, lang, defaultLanguage, onChangeValue, data } = props;
  const {
    Labels: { Actions: ActionsLabels, Menu: MenuLabels },
  } = Locale[defaultLanguage];
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.textField}
          label={MenuLabels.DISH_NAME}
          name="name"
          onChange={onChangeValue}
          type="text"
          value={data.name}
          inputProps={{ 'data-lang': lang }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          multiline={true}
          className={classes.textField}
          label={MenuLabels.DESCRIPTION}
          inputProps={{ 'data-lang': lang }}
          name="description"
          onChange={onChangeValue}
          type="text"
          value={data.description}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          className={classes.textField}
          label={MenuLabels.INGREDIENTS_LIST}
          inputProps={{ 'data-lang': lang }}
          name="ingredients"
          onChange={onChangeValue}
          type="text"
          value={data.ingredients}
        />
      </FormControl>
    </>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LocaleEditor);