import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';
import GamesList from './components/GamesList.js';
import SummaryTeam from './components/SummaryTeam.js';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.goToAnotherTeam = this.goToAnotherTeam.bind(this);
  }

  saveLinkPropsToState (params) {
    const season = params.season;
    const country = params.country;
    const league = params.league;
    const team = params.team;
    this.setState({
      season: season,
      country: country,
      league: league,
      team: team
    });
  }

  ajaxCallGames (season, country, league, team) {
    let gamesList= [];
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/games.json`;
    axios.get(URL)
    .then ((res) => {
      res.data.games.forEach((item, i) => {
        if (item.homeTeam !== team && item.awayTeam !== team) return;
        gamesList.push(item);
      });
      this.setState({gamesList: gamesList});
    })
    .catch((error) => console.log(error));
  }

  async goToAnotherTeam (team) {
    await this.setState({team: team});
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.team);
    this.ajaxCallSummary (this.state.season, this.state.country, this.state.league, this.state.team);
  }

  ajaxCallSummary (season, country, league, team) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    axios.get(URL)
    .then ((res) => {
      res.data.standings.forEach((item, i, arr) => {
        if (item.name !== team) return;
        this.setState({summary: item});
      });
    })
    .catch((error) => console.log(error));
  }

  handleClickOnTabs (event) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    const tablinks = document.getElementsByClassName('tablink');
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
      }
    document.getElementById(event.target.dataset.active).style.display = 'block';
    event.target.classList.add('active');
  }

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.team);
    this.ajaxCallSummary (this.state.season, this.state.country, this.state.league, this.state.team);
  }

  render() {
    if ('gamesList' in this.state && 'team' in this.state && 'summary' in this.state) {
      return (
        <div>
          <div className="centered">
            <Link to="/">Home</Link>
          </div>
          <h3 className="team-name">{this.state.team}</h3>
          <div className="control-statistics" onClick={this.handleClickOnTabs}>
            <div data-active="games-list" className="games-list-tab tablink active">Games list</div>
            <div data-active="summary-team" className="summary-tab tablink">Summary</div>
          </div>
          <GamesList goTo={this.goToAnotherTeam} gamesList={ this.state.gamesList } team={this.state.team} season={this.state.season} country={this.state.country} league={this.state.league}/>
          <SummaryTeam summary={ this.state.summary }/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
