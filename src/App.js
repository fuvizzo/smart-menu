import React from 'react';
import { connect } from 'react-redux';
//import Admin from './Components/Admin/index';
import SignIn from './Components/Auth/signIn';
import UserDashboard from './Components/UserDashboard/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthRoute from './Components/Auth/authRoute';

const App = props => {
  return (
    <div>
      <Router>
        {/* <Link to="/signin">Signin</Link> */}
        {!props.user && <Redirect from="/" to="signin" />}

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <AuthRoute path="/dashboard">
            <UserDashboard />
          </AuthRoute>
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
