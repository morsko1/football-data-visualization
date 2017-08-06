import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';
import SummaryStatistics from './components/SummaryStatistics.js';
import ComparingTeams from './components/ComparingTeams.js';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
      valueSelect: 'pointsTotal'
    };
    this.sortTeams = this.sortTeams.bind(this);
  }

  saveLinkPropsToState (params) {
    const season = params.season;
    const country = params.country;
    const league = params.league;
    this.setState({
      season: season,
      country: country,
      league: league
    });
  }

  ajaxCallGames (season, country, league) {
    let summary ={
      numOfGames: 0,
      // fullTimeResult: '',
      fullTimeHomeTeamWins: 0,
      fullTimeDraws: 0,
      fullTimeAwayTeamWins: 0,
      // halfTimeResult: '',
      halfTimeHomeTeamWins: 0,
      halfTimeDraws: 0,
      halfTimeAwayTeamWins: 0,
      fullTimeHomeTeamGoals: 0,
      fullTimeAwayTeamGoals: 0,
      halfTimeHomeTeamGoals: 0,
      halfTimeAwayTeamGoals: 0,
      homeTeamShots: 0,
      awayTeamShots: 0,
      homeTeamShotsOnTarget: 0,
      awayTeamShotsOnTarget: 0,
      homeTeamCorners: 0,
      awayTeamCorners: 0,
      homeTeamFouls: 0,
      awayTeamFouls: 0,
      homeTeamYellowCards: 0,
      awayTeamYellowCards: 0,
      homeTeamRedCards: 0,
      awayTeamRedCards: 0
    };
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/games-full.json`;
    axios.get(URL)
    .then ((res) => {
      res.data.games.forEach((item, i) => {
        for (var prop in summary) {
          //get wins/draws/losses statistics for home/away team
          if (prop === 'fullTimeHomeTeamWins' ||
              prop === 'fullTimeDraws'        ||
              prop === 'fullTimeAwayTeamWins' ||
              prop === 'halfTimeHomeTeamWins' ||
              prop === 'halfTimeDraws'        ||
              prop === 'halfTimeAwayTeamWins') {
                if (prop === 'fullTimeHomeTeamWins' && item.fullTimeResult === 'H') summary.fullTimeHomeTeamWins += 1;
                if (prop === 'fullTimeDraws'        && item.fullTimeResult === 'D')        summary.fullTimeDraws += 1;
                if (prop === 'fullTimeAwayTeamWins' && item.fullTimeResult === 'A') summary.fullTimeAwayTeamWins += 1;

                if (prop === 'halfTimeHomeTeamWins' && item.halfTimeResult === 'H') summary.halfTimeHomeTeamWins += 1;
                if (prop === 'halfTimeDraws'        && item.halfTimeResult === 'D')        summary.halfTimeDraws += 1;
                if (prop === 'halfTimeAwayTeamWins' && item.halfTimeResult === 'A') summary.halfTimeAwayTeamWins += 1;
          } else {
            summary[prop] += item[prop];
          }
        }
      })
      summary.numOfGames = res.data.games.length;
      const seasonView = res.data.season;
      const leagueView = res.data.name;
      this.setState({
        summary: summary,
        seasonView: seasonView,
        leagueView: leagueView
      });
    })
    .catch((error) => console.log(error));
  }

  ajaxCallComparingTeams (season, country, league) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    axios.get(URL)
    .then ((res) => {
      const teams = res.data.standings.map((item) => {
        return item;
      });
      this.setState({teams: teams});
    })
    .catch((error) => console.log(error));
  }

  async sortTeams (event) {
    await this.setState({valueSelect: event.target.value});
    var teams = this.state.teams;
    teams.sort((a, b) => {
      return b[this.state.valueSelect] - a[this.state.valueSelect];
    })
    this.setState({teams: teams})
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
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league);
    this.ajaxCallComparingTeams (this.state.season, this.state.country, this.state.league);
  }

  render() {
    const summary = this.state.summary;
    const seasonView = this.state.seasonView;
    const leagueView = this.state.leagueView;
    if  ('summary' in this.state && 'seasonView' in this.state && 'leagueView' in this.state && 'teams' in this.state) {
      return (
        <div>
          <div className="centered">
            <Link to="/">Home</Link>
          </div>
          <div className="centered">
            <h4>Summary of Championship</h4>
            <div>{seasonView}</div>
            <div>{leagueView}</div>
          </div>
          <div className="control-statistics" onClick={this.handleClickOnTabs}>
            <div data-active="summary-statistics" className="summary-statistics-tab tablink active">Summary</div>
            <div data-active="comparing-teams" className="comparing-teams-tab tablink">Comparing Teams</div>
          </div>
          <SummaryStatistics summary={summary}/>
          <ComparingTeams summary={summary} teams={this.state.teams} sortTeams={this.sortTeams} valueSelect={this.state.valueSelect}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
