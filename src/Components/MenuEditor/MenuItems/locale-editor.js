import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import constants from '../../../Constants/index';
import useStyles from '../../Common/styles';
import BaseLocaleEditor from '../base-locale-editor';
import TextField from '@material-ui/core/TextField';

const { Locale } = constants;
const LocaleEditor = props => {
  const { lang, defaultLanguage, onChangeValue, data } = props;
  const {
    Labels: { Menu: MenuLabels },
  } = Locale[defaultLanguage];
  const classes = useStyles();

  return (
    <BaseLocaleEditor
      {...props}
      labels={{
        name: MenuLabels.DISH_NAME,
        description: MenuLabels.DESCRIPTION,
      }}
    >
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
    </BaseLocaleEditor>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LocaleEditor);
