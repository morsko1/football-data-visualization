import React, { Component } from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/Home/';
import Team from './pages/Team/';
import Game from './pages/Game/';
import Summary from './pages/Summary/';
import NotFound from './pages/NotFound/';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:season/:country/:league/:team" component={Team}/>
          <Route exact path="/:season/:country/:league/games/:id" component={Game}/>
          <Route exact path="/:season/:country/:league" component={Summary}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
