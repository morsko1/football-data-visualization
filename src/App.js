import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home/';
import Team from './pages/Team/';
import NotFound from './pages/NotFound/';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:season/:country/:league/:team" component={Team}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
