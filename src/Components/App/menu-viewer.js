import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMenu } from '../../Actions/menu-actions';

const MenuViewer = props => {
  const { businessUniqueUrlPath } = useParams();

  useEffect(() => {
    props.getMenu(businessUniqueUrlPath);
  }, []);

  return <> Json: {JSON.stringify(props.public.menu)}</>;
};
function mapStateToProps(state) {
  return {
    user: state.user,
    public: state.public,
  };
}

export default connect(mapStateToProps, { getMenu })(MenuViewer);
