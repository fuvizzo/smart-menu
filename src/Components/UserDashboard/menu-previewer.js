import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MenuViewer from '../App/menu-viewer';

import { useLocation } from 'react-router-dom';
import { getPreviewMenu } from '../../Actions/menu-actions';
const MenuPreviewer = props => {
  const query = useQuery();
  useEffect(() => {
    const menuId = query.get('menu-id');
    props.getPreviewMenu(menuId);
  }, []);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  return <MenuViewer isPreview={true} />;
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    business: state.business,
  };
}

export default connect(mapStateToProps, { getPreviewMenu })(MenuPreviewer);
