import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Home from './home/Home';
import UserService from '../services/UserService';

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="sign-in" />
        <Route exact path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/home' render={() => (
          !UserService.getCurrentUser()
            ? <Redirect to="/" />
            : <Home />
        )} />
      </Switch>
    );
  }
}

export default withRouter(App);