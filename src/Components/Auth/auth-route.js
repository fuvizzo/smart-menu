import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const AuthRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(AuthRoute);
