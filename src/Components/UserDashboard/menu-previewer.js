import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MenuViewer from '../MenuViewer/menu-viewer';

import { useParams } from 'react-router-dom';
import { getPreviewMenu } from '../../Actions/menu-actions';
const MenuPreviewer = props => {
  const { menuId } = useParams();

  useEffect(() => {
    props.getPreviewMenu(menuId);
  }, [menuId]);

  return <MenuViewer isPreview={true} />;
};

export default connect(null, { getPreviewMenu })(MenuPreviewer);
