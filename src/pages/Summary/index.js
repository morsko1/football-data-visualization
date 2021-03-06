import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';
import SummaryStatistics from './components/SummaryStatistics';
import ComparingTeams from './components/ComparingTeams';
import * as Functions from '../../functions/';

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

  ajaxCallSummary (season, country, league) {
    let summary ={
      numOfGames: 0,
      fullTimeHomeTeamWins: 0,
      fullTimeDraws: 0,
      fullTimeAwayTeamWins: 0,
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

  async ajaxCallStandingsFull (season, country, league) {
    let teams1;
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    await axios.get(URL)
    .then ((res) => {
      teams1 = res.data.standings.map((item) => {
        return item;
      });
    })
    .catch((error) => console.log(error));

    const teams2 = [];
    const URL2 = `${Constants.BASE_URL}${season}/${country}/${league}/games-full.json`;
    await axios.get(URL2)
    .then ((res) => {
      teams1.forEach((team) => {
        let obj = {
          name: team.name,
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
        res.data.games.forEach((game) => {
          if(game.homeTeam !== team.name && game.awayTeam !== team.name) {
            return;
          }
          if (team.name === game.homeTeam) {
            obj.halfTimeGoals        += game.halfTimeHomeTeamGoals;
            obj.halfTimeGoalsAllowed += game.halfTimeAwayTeamGoals;
            obj.shots                += game.homeTeamShots;
            obj.shotsAllowed         += game.awayTeamShots;
            obj.shotsOnTarget        += game.homeTeamShotsOnTarget;
            obj.shotsOnTargetAllowed += game.awayTeamShotsOnTarget;
            obj.corners              += game.homeTeamCorners;
            obj.cornersAllowed       += game.awayTeamCorners;
            obj.fouls                += game.homeTeamFouls;
            obj.foulsAllowed         += game.awayTeamFouls;
            obj.yellowCards          += game.homeTeamYellowCards;
            obj.yellowCardsAllowed   += game.awayTeamYellowCards;
            obj.redCards             += game.homeTeamRedCards;
            obj.redCardsAllowed      += game.awayTeamRedCards;
          } else if (team.name === game.awayTeam) {
            obj.halfTimeGoals        += game.halfTimeAwayTeamGoals;
            obj.halfTimeGoalsAllowed += game.halfTimeHomeTeamGoals;
            obj.shots                += game.awayTeamShots;
            obj.shotsAllowed         += game.homeTeamShots;
            obj.shotsOnTarget        += game.awayTeamShotsOnTarget;
            obj.shotsOnTargetAllowed += game.homeTeamShotsOnTarget;
            obj.corners              += game.awayTeamCorners;
            obj.cornersAllowed       += game.homeTeamCorners;
            obj.fouls                += game.awayTeamFouls;
            obj.foulsAllowed         += game.homeTeamFouls;
            obj.yellowCards          += game.awayTeamYellowCards;
            obj.yellowCardsAllowed   += game.homeTeamYellowCards;
            obj.redCards             += game.awayTeamRedCards;
            obj.redCardsAllowed      += game.homeTeamRedCards;
          }
        });
        teams2.push(obj);
      });
    })
    .catch((error) => console.log(error));

    const teams = [];
    for (let i=0; i<teams1.length; i++) {
      const assigned = Object.assign({}, teams1[i], teams2[i]);
      teams.push(assigned);
    }
    this.setState({teams: teams});
  }

  async sortTeams (event) {
    await this.setState({valueSelect: event.target.value});
    var teams = this.state.teams;
    teams.sort((a, b) => {
      return b[this.state.valueSelect] - a[this.state.valueSelect];
    })
    this.setState({teams: teams})
  }

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    this.ajaxCallSummary (this.state.season, this.state.country, this.state.league);
    this.ajaxCallStandingsFull (this.state.season, this.state.country, this.state.league);
  }

  render() {
    const summary = this.state.summary;
    const seasonView = this.state.seasonView;
    const leagueView = this.state.leagueView;
    if  ('summary'   in this.state &&
        'seasonView' in this.state &&
        'leagueView' in this.state &&
        'teams'      in this.state) {
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
          <div
            className="control-statistics"
            onClick={Functions.handleClickOnTabs}>
            <div
              data-active="summary-statistics"
              className="summary-statistics-tab tablink ">
                Summary
            </div>
            <div
              data-active="comparing-teams"
              className="comparing-teams-tab tablink active">
                Comparing Teams
            </div>
          </div>
          <SummaryStatistics summary={summary}/>
          <ComparingTeams summary={summary}
            teams={this.state.teams}
            sortTeams={this.sortTeams}
            valueSelect={this.state.valueSelect}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
