import styled from 'styled-components';

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-style: double;
  border-color: ${props => (props.color ? props.color : 'black')};
  border-left: none;
  border-right: none;
  border-top: none;
  border-width: 4px;
  
  &:hover {
    cursor: pointer;
  }
  
  &:last-of-type {
    border: none;
  }
`;

const Title = styled.h4`
  text-transform: uppercase;
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.color ? props.color : '#2C394A'};
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: ${props => props.color ? props.color : '#3D3D3D'};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Ingredients = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
  color: #3D3D3D;
`;

const Price = styled.p`
  margin: 0;
  font-weight: bold;
  color: ${props => (props.color ? props.color : '#2C394A')};
  min-width: 60px;
  text-align: right;
  align-self: flex-start;
`;

const MenuItemMeta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

export {
  MenuItemMeta,
  Description,
  Ingredients,
  Title,
  Price,
}

export default MenuItemContainer;
