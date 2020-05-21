import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { setProvidedLanguages } from '../../../Actions/menu-actions';
import constants from '../../../Constants/index';
import useCommonStyles from '../../Common/styles';

const { Locales } = constants;
const MenuLanguageSettingEditor = props => {
  const { menuId } = useParams();
  const { ui, menu } = props;
  const defaultLanguage = ui.settings.defaultLanguage;

  const {
    Labels: { Menu: MenuLabels },
    Languages,
  } = Locales[defaultLanguage];

  const onChangeValueHandler = useCallback(
    event => {
      let languages = [...menu.providedLanguages];
      const selectedLang = event.target.name;
      if (
        (menu.providedLanguages.length === 0 ||
          menu.providedLanguages.some(lang => lang !== selectedLang)) &&
        event.target.checked
      ) {
        languages.push(selectedLang);
      } else {
        languages = languages.filter(lang => lang !== selectedLang);
      }
      props.setProvidedLanguages(menuId, languages);
    },
    [menu.providedLanguages.length]
  );

  const commonClasses = useCommonStyles();
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
            <FormControl
              component="fieldset"
              className={commonClasses.formControl}
            >
              <FormLabel
                className={commonClasses.label}
                component="legend"
                id="language-select-label"
              >
                {MenuLabels.PROVIDED_LANGUAGES}
              </FormLabel>

              <FormGroup
                aria-label="language-select-label"
                onChange={onChangeValueHandler}
              >
                {constants.SupportedLanguages.filter(lang => Locales[lang]).map(
                  (lang, index) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            checked={menu.providedLanguages.some(
                              value => value === lang
                            )}
                            name={lang}
                          />
                        }
                        label={Languages[lang]}
                      />
                    );
                  }
                )}
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
