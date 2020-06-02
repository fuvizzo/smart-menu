import styled from 'styled-components';
import {Box} from "@material-ui/core";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionSelectorWrapper = styled.div`
  display: flex;
  align-self: flex-start;
`;

const Logo = styled.img`
  display: block;
  width: 100px;
  height: auto;
`;

const Title = styled.h2`
  margin: 0;
`;

const StyledLanguageBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.85);
  padding: 5px;
  border-radius: 4px;
`;

export { Logo, Title, ActionSelectorWrapper, StyledLanguageBox };

export default HeaderContainer;
