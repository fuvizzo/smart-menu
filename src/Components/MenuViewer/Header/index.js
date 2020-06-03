import React from 'react';
import LanguageSelector from '../../Common/public-language-selector';
import HeaderContainer, {
  Logo,
  Title,
  ActionSelectorWrapper,
  BackButtonHolder,
} from './styles';
import UndoIcon from '@material-ui/icons/Undo';
import IconButton from '@material-ui/core/IconButton';

import { Link, useLocation } from 'react-router-dom';
import constants from '../../../Constants';
import Box from '@material-ui/core/Box';
const { Locales } = constants;

const Header = props => {
  const {
    defaultLanguage,
    languageChangeHandler,
    data: {
      name,
      media: { logo },
    },
  } = props;

  const location = useLocation();
  const {
    Labels: { Common: CommonLabels, Actions: ActionLabels },
  } = Locales[defaultLanguage];

  return (
    <HeaderContainer maxWidth="lg">
      <div>{logo ? <Logo src={logo.url} /> : <Title>{name}</Title>}</div>
      <ActionSelectorWrapper>
        {location.pathname.includes('menu/') && (
          <BackButtonHolder>
            <IconButton
              size="small"
              to="../../"
              component={Link}
              aria-label={ActionLabels.BACK_TO_MENU_LIST}
            >
              <UndoIcon />
            </IconButton>
          </BackButtonHolder>
        )}
        <Box>
          <LanguageSelector
            languageLabel={CommonLabels.LANGUAGE}
            value={defaultLanguage}
            onChange={languageChangeHandler}
          />
        </Box>
      </ActionSelectorWrapper>
    </HeaderContainer>
  );
};

export default Header;
