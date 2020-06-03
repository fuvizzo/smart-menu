import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ActionSelectorWrapper = styled.div`
  display: flex;
  align-self: flex-start;
`;

const Logo = styled.img`
  display: block;
  width: 100px;
  height: auto;
  align-self: flex-start;
`;

const Title = styled.h2`
  margin: 0;
`;

const BackButtonHolder = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
`;

export { Logo, Title, ActionSelectorWrapper, BackButtonHolder };

export default HeaderContainer;
