import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
//import Admin from './Components/Admin/index';
import SignIn from './Components/Auth/signIn';
import UserDashboard from './Components/UserDashboard/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

const App = props => {
  const { user } = props;

  const PrivateRoute = useCallback(
    ({ children, ...rest }) => {
      console.log(user);
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
    },
    [user]
  );

  return (
    <div>
      <Router>
        {/* <Link to="/signin">Signin</Link> */}

        <Redirect from="/" to="signin" />

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <PrivateRoute path="/dashboard">
            <UserDashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
