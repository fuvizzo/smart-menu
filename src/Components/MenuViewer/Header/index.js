import React from 'react';
import LanguageSelector from '../../Common/public-language-selector';
import HeaderContainer, { Logo, Title, ActionSelectorWrapper, StyledLanguageBox } from './styles';
import UndoIcon from '@material-ui/icons/Undo';
import IconButton from '@material-ui/core/IconButton';

import { Link, useLocation } from 'react-router-dom';
import constants from '../../../Constants';
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
          <IconButton
            size="small"
            to="../../"
            component={Link}
            aria-label={ActionLabels.BACK_TO_MENU_LIST}
          >
            <UndoIcon />
          </IconButton>
        )}
        <StyledLanguageBox ml={1}>
          <LanguageSelector
            languageLabel={CommonLabels.LANGUAGE}
            value={defaultLanguage}
            onChange={languageChangeHandler}
          />
        </StyledLanguageBox>
      </ActionSelectorWrapper>
    </HeaderContainer>
  );
};

export default Header;
