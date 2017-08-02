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
    const id = params.id;
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
      const countryView = res.data.country;
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
    const seasonView = ('seasonView' in this.state) ? this.state.seasonView : null;
    const leagueView = ('leagueView' in this.state) ? this.state.leagueView : null;
    const numOfGames = ('summary' in this.state) ? this.state.summary.numOfGames : null;
    const fullTimeHomeTeamGoals = ('summary' in this.state) ? this.state.summary.fullTimeHomeTeamGoals : null;
    const fullTimeAwayTeamGoals = ('summary' in this.state) ? this.state.summary.fullTimeAwayTeamGoals : null;
    const halfTimeHomeTeamGoals = ('summary' in this.state) ? this.state.summary.halfTimeHomeTeamGoals : null;
    const halfTimeAwayTeamGoals = ('summary' in this.state) ? this.state.summary.halfTimeAwayTeamGoals : null;
    const homeTeamShots = ('summary' in this.state) ? this.state.summary.homeTeamShots : null;
    const awayTeamShots = ('summary' in this.state) ? this.state.summary.awayTeamShots : null;
    const homeTeamShotsOnTarget = ('summary' in this.state) ? this.state.summary.homeTeamShotsOnTarget : null;
    const awayTeamShotsOnTarget = ('summary' in this.state) ? this.state.summary.awayTeamShotsOnTarget : null;
    const homeTeamCorners = ('summary' in this.state) ? this.state.summary.homeTeamCorners : null;
    const awayTeamCorners = ('summary' in this.state) ? this.state.summary.awayTeamCorners : null;
    const homeTeamFouls = ('summary' in this.state) ? this.state.summary.homeTeamFouls : null;
    const awayTeamFouls = ('summary' in this.state) ? this.state.summary.awayTeamFouls : null;
    const homeTeamYellowCards = ('summary' in this.state) ? this.state.summary.homeTeamYellowCards : null;
    const awayTeamYellowCards = ('summary' in this.state) ? this.state.summary.awayTeamYellowCards : null;
    const homeTeamRedCards = ('summary' in this.state) ? this.state.summary.homeTeamRedCards : null;
    const awayTeamRedCards = ('summary' in this.state) ? this.state.summary.awayTeamRedCards : null;
    return (
      <div>
        <div className="centered">
          <Link to="/">Home</Link>
        </div>
        <div className="centered">
          <h3>Summary of Championship</h3>
          <div>{seasonView}</div>
          <div>{leagueView}</div>
        </div>
        <div className="summary">
          Games: {numOfGames}
        </div>
      </div>
    );
  }
}

export default Team;
