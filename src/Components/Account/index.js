import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core/';

import { Label, FormControl } from '../Common/styles';
import { setDefaultSystemLanguage } from '../../Actions/ui-actions';
import { mockUnlocalizedMenus } from '../../Actions/menu-actions';
import constants from '../../Constants/index';

const { Locales } = constants;

const Account = props => {
  const { ui } = props;
  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Account: AccountLabels },
    Languages,
    DEFAULT_LANGUAGE,
  } = Locales[defaultLanguage];

  const onChangeValueHandler = useCallback(
    (event, value) => {
      props.setDefaultSystemLanguage(value);
      props.mockUnlocalizedMenus(value);
    },
    [defaultLanguage]
  );

  return (
    <Box p={2}>
      <Box pb={2} p={0}>
        <Label color="textSecondary" variant="h1">
          {AccountLabels.ACCOUNT_OWNER}
        </Label>
        <Typography>
          {props.user.firstName} {props.user.lastName}
        </Typography>
      </Box>
      <Box pb={2} p={0}>
        <Label color="textSecondary" variant="h1">
          {AccountLabels.EMAIL_ADDRESS}
        </Label>
        <Typography>{props.user.email}</Typography>
      </Box>
      <FormControl component="fieldset">
        <Label color="textSecondary" variant="h1" id="language-select-label">
          {DEFAULT_LANGUAGE}
        </Label>

        <RadioGroup
          aria-label="language-select-label"
          value={defaultLanguage}
          onChange={onChangeValueHandler}
        >
          {constants.SupportedLanguages.map((lang, index) => {
            return (
              <FormControlLabel
                disabled={!Locales[lang]}
                key={index}
                value={lang}
                control={<Radio />}
                label={
                  Locales[lang]
                    ? Languages[lang]
                    : `${Languages[lang]} (Translation is coming soon!)`
                }
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    user: state.account.user,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, {
  setDefaultSystemLanguage,
  mockUnlocalizedMenus,
})(Account);
