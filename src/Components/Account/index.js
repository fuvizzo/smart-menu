import React from 'react';
import { connect } from 'react-redux';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/index';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import * as uiActions from '../../Actions/ui-actions';

import useCommonStyles from '../Common/styles';

const { Locales } = constants;
const Account = props => {
  const { ui } = props;
  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Actions: ActionsLabels, Account: AccountLabels },
    Languages,
    DEFAULT_LANGUAGE,
  } = Locales[defaultLanguage];
  const commonClasses = useCommonStyles();
  return (
    <Box p={2}>
      <Box pb={2} p={0}>
        <Typography
          className={commonClasses.label}
          color="textSecondary"
          variant="h1"
        >
          {AccountLabels.ACCOUNT_OWNER}
        </Typography>
        <Typography>
          {props.user.firstName} {props.user.lastName}
        </Typography>
      </Box>
      <FormControl className={commonClasses.formControl}>
        <InputLabel id="dish-select-label">{DEFAULT_LANGUAGE}</InputLabel>
        <Select
          className={commonClasses.selectField}
          labelId="dish-select-label"
          name="category"
          value={defaultLanguage}
          onChange={event => {
            event.currentTarget.name = event.target.name;
            //onChangeValueHandler(event);
          }}
        >
          {constants.SupportedLanguages.map((lang, index) => {
            return (
              <MenuItem key={index} value={lang}>
                {Languages[lang]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(Account);
