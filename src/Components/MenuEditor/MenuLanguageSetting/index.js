import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Box,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  Grid,
} from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { setProvidedLanguages } from '../../../Actions/menu-actions';
import constants from '../../../Constants/index';
import { FormControl, Label } from '../../Common/styles';

const { Locales } = constants;
const MenuLanguageSettingEditor = props => {
  const { menuId } = useParams();
  const { ui, menu } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const providedLanguages = menu.providedLanguages || [];
  const {
    Labels: { Menu: MenuLabels },
    Languages,
  } = Locales[defaultLanguage];

  const onChangeValueHandler = useCallback(
    event => {
      let languages = [...providedLanguages];
      const selectedLang = event.target.name;
      if (
        (providedLanguages.length === 0 ||
          providedLanguages.some(lang => lang !== selectedLang)) &&
        event.target.checked
      ) {
        languages.push(selectedLang);
      } else {
        languages = languages.filter(lang => lang !== selectedLang);
      }
      props.setProvidedLanguages(menuId, languages);
    },
    [providedLanguages.length]
  );

  return (
    <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Card width={1} elevation={2}>
          <Box p={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend" id="language-select-label">
                <Label>{MenuLabels.PROVIDED_LANGUAGES}</Label>
              </FormLabel>

              <FormGroup
                aria-label="language-select-label"
                onChange={onChangeValueHandler}
              >
                {Object.keys(Locales).map((lang, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          color="secondary"
                          checked={providedLanguages.some(
                            value => value === lang
                          )}
                          name={lang}
                        />
                      }
                      label={Languages[lang]}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { setProvidedLanguages })(
  MenuLanguageSettingEditor
);
