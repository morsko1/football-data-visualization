import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  // Link,
  Switch
} from 'react-router-dom'
import Home from './pages/Home/';
import NotFound from './pages/NotFound/';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;