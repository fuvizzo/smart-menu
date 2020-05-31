import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  /* margin-top: 40px; */
  align-items: stretch;
  justify-content: space-between;
  padding: 10px 0;
`;

const ActionSelectorWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100px;
  align-items: center;
`;

const Logo = styled.img`
  display: block;
  width: 100px;
  height: auto;
`;

const Title = styled.h2`
  margin: 0;
`;

export { Logo, Title, ActionSelectorWrapper };

export default HeaderContainer;
