import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';
import GamesList from './components/GamesList';
import SummaryTeam from './components/SummaryTeam';
import * as Functions from '../../functions/';

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
    this.ajaxCallSummaryTeam (this.state.season, this.state.country, this.state.league, this.state.team);
    window.scrollTo(0, 0);
  }

  async ajaxCallSummaryTeam (season, country, league, team) {
    let summary1;
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    await axios.get(URL)
    .then ((res) => {
      res.data.standings.forEach((item, i, arr) => {
        if (item.name !== team) return;
          summary1 = item;
      });
    })
    .catch((error) => console.log(error));

    let summary2 = {
      name: summary1.name,
      halfTimeGoals: 0,
      halfTimeGoalsAllowed: 0,
      shots: 0,
      shotsAllowed: 0,
      shotsOnTarget: 0,
      shotsOnTargetAllowed: 0,
      corners: 0,
      cornersAllowed: 0,
      fouls: 0,
      foulsAllowed: 0,
      yellowCards: 0,
      yellowCardsAllowed: 0,
      redCards: 0,
      redCardsAllowed: 0
    };
    const URL2 = `${Constants.BASE_URL}${season}/${country}/${league}/games-full.json`;
    await axios.get(URL2)
    .then ((res) => {
      res.data.games.forEach((game) => {
        if(game.homeTeam !== summary1.name && game.awayTeam !== summary1.name) {
          return;
        }
        if (summary1.name === game.homeTeam) {
          summary2.halfTimeGoals        += game.halfTimeHomeTeamGoals;
          summary2.halfTimeGoalsAllowed += game.halfTimeAwayTeamGoals;
          summary2.shots                += game.homeTeamShots;
          summary2.shotsAllowed         += game.awayTeamShots;
          summary2.shotsOnTarget        += game.homeTeamShotsOnTarget;
          summary2.shotsOnTargetAllowed += game.awayTeamShotsOnTarget;
          summary2.corners              += game.homeTeamCorners;
          summary2.cornersAllowed       += game.awayTeamCorners;
          summary2.fouls                += game.homeTeamFouls;
          summary2.foulsAllowed         += game.awayTeamFouls;
          summary2.yellowCards          += game.homeTeamYellowCards;
          summary2.yellowCardsAllowed   += game.awayTeamYellowCards;
          summary2.redCards             += game.homeTeamRedCards;
          summary2.redCardsAllowed      += game.awayTeamRedCards;
        } else if (summary1.name === game.awayTeam) {
          summary2.halfTimeGoals        += game.halfTimeAwayTeamGoals;
          summary2.halfTimeGoalsAllowed += game.halfTimeHomeTeamGoals;
          summary2.shots                += game.awayTeamShots;
          summary2.shotsAllowed         += game.homeTeamShots;
          summary2.shotsOnTarget        += game.awayTeamShotsOnTarget;
          summary2.shotsOnTargetAllowed += game.homeTeamShotsOnTarget;
          summary2.corners              += game.awayTeamCorners;
          summary2.cornersAllowed       += game.homeTeamCorners;
          summary2.fouls                += game.awayTeamFouls;
          summary2.foulsAllowed         += game.homeTeamFouls;
          summary2.yellowCards          += game.awayTeamYellowCards;
          summary2.yellowCardsAllowed   += game.homeTeamYellowCards;
          summary2.redCards             += game.awayTeamRedCards;
          summary2.redCardsAllowed      += game.homeTeamRedCards;
        }
      });
    })
    .catch((error) => console.log(error));
    const summary = Object.assign({}, summary1, summary2);
    this.setState({summary: summary});
  }

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.team);
    this.ajaxCallSummaryTeam (this.state.season, this.state.country, this.state.league, this.state.team);
  }

  render() {
    if ('gamesList' in this.state && 'team' in this.state && 'summary' in this.state) {
      return (
        <div>
          <div className="centered">
            <Link to="/">Home</Link>
          </div>
          <h3 className="team-name">
            {this.state.team}
          </h3>
          <div
            className="control-statistics"
            onClick={Functions.handleClickOnTabs}>
              <div
                data-active="games-list"
                className="games-list-tab tablink active">
                  Games list
              </div>
              <div
                data-active="summary-team"
                className="summary-tab tablink">
                  Summary
              </div>
          </div>
          <GamesList
            goTo={this.goToAnotherTeam}
            gamesList={ this.state.gamesList }
            team={this.state.team}
            season={this.state.season}
            country={this.state.country}
            league={this.state.league}/>
          <SummaryTeam summary={ this.state.summary}/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
