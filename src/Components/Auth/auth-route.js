import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const AuthRoute = ({ account, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        account ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/authentication/sign-in',
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
    account: state.account,
  };
}

export default connect(mapStateToProps)(AuthRoute);
