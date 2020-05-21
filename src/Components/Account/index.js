import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setDefaultSystemLanguage } from '../../Actions/ui-actions';
import { mockUnlocalizedMenus } from '../../Actions/menu-actions';
import constants from '../../Constants/index';
import useCommonStyles from '../Common/styles';

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
      <Box pb={2} p={0}>
        <Typography
          className={commonClasses.label}
          color="textSecondary"
          variant="h1"
        >
          {AccountLabels.EMAIL_ADDRESS}
        </Typography>
        <Typography>{props.user.email}</Typography>
      </Box>
      <FormControl component="fieldset" className={commonClasses.formControl}>
        <FormLabel
          className={commonClasses.label}
          component="legend"
          id="language-select-label"
        >
          {DEFAULT_LANGUAGE}
        </FormLabel>

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
