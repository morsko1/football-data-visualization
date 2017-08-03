import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
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
      fullTimeResult: '',
      halfTimeResult: '',
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
          summary[prop] += item[prop];
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

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league);
  }

  render() {
    const summary = this.state.summary;
    if ('summary' in this.state && 'seasonView' in this.state && 'leagueView' in this.state) {
      return (
        <div>
          <div className="centered">
            <Link to="/">Home</Link>
          </div>
          <div className="centered">
            <h3>Summary of Championship</h3>
            <div>{this.state.seasonView}</div>
            <div>{this.state.leagueView}</div>
          </div>
          <div className="summary">
            Games: {summary.numOfGames}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
