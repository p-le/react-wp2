import React, { Component } from 'react';
import { Link, Route, Switch  } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';

import * as cookies from 'browser-cookies';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Config from 'Config';

import Login from '../Login';
import Private from '../Private';
import Transition from '../Transition';
import Public from '../Public';
import AuthRoute from '../AuthRoute';

import { authenticate } from '../../actions/AuthActions/actions';

const muiTheme = getMuiTheme({});

class App extends Component {

  componentDidMount() {
    const auth = cookies.get('auth');
    const { authenticate } = this.props;
    console.log(Config);
    if(auth) {
      authenticate();
    }
  } 

  render() {
    const { isAuthenticated } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar 
            title="React Budget" 
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
          /> 
          <List>
            <ListItem primaryText="Public" containerElement={<Link to="/public" />} />
            <ListItem primaryText="Private" containerElement={<Link to="/private" />} />
            <ListItem primaryText="Transition" containerElement={<Link to="/transition" />} />
          </List>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/public" component={Public} />
            <Route path="/transition" component={Transition} />
            <AuthRoute path="/private" component={Private} isAuthenticated={isAuthenticated} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({ authenticate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
