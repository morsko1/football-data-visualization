import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Constants from '../../constants/';

class Team extends Component {
  constructor (props) {
    super(props);
    this.state = {};
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
    let gameNum = 0;
    let gamesList= [];
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/games.json`;
    axios.get(URL)
    .then ((res) => {
      res.data.games.forEach((item, i) => {
        if (item.homeTeam !== team && item.awayTeam !== team) return;
        gameNum = gameNum + 1;
        const game = <div key={item.date} className="game-single">
                        <span className="game-num">{gameNum}</span>
                        <div className="game-date">{item.date}</div>
                        <div className="game-teams">
                          <div className="game-home-team">
                            <Link className="link-to-team" to={`${item.homeTeam}`} onClick={this.goToAnotherTeam.bind(this, item.homeTeam)}>{item.homeTeam}</Link>
                          </div>
                          <div className="game-away-team">
                            <Link className="link-to-team" to={`${item.awayTeam}`} onClick={this.goToAnotherTeam.bind(this, item.awayTeam)}>{item.awayTeam}</Link>
                          </div>
                        </div>
                        <div className="game-goals">
                          <div className="game-home-team-goals">{item.fullTimeHomeTeamGoals}</div>
                          <div className="game-away-team-goals">{item.fullTimeAwayTeamGoals}</div>
                        </div>
                      </div>
        gamesList.push(game);
      });
      this.setState({gamesList: gamesList});
    })
    .catch((error) => console.log(error));
  }

  async goToAnotherTeam (team, event) {
    await this.setState({team: team});
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.team);
  }

  ajaxCallSummary (season, country, league, team) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    axios.get(URL)
    .then ((res) => {
      res.data.standings.forEach((item, i, arr) => {
        if (item.name !== team) return;
        console.log(item);
        const summary = <div className="summary-content">
                          <div>Games: {item.games}</div>
                          <div>Goals scored: {item.goalsTotal}</div>
                          <div>Goals allowed: {item.goalsTotalAllowed}</div>
                          <table className="ftr-table">
                            <tbody>
                              <tr>
                                <td>Wins</td>
                                <td>Draws</td>
                                <td>Losses</td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="centered">Total</td>
                              </tr>
                              <tr>
                                <td className="centered">{item.wins}</td>
                                <td className="centered">{item.draws}</td>
                                <td className="centered">{item.losses}</td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="centered">Home</td>
                              </tr>
                              <tr>
                                <td className="centered">{item.winsHome}</td>
                                <td className="centered">{item.drawsHome}</td>
                                <td className="centered">{item.lossesHome}</td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="centered">Away</td>
                              </tr>
                              <tr>
                                <td className="centered">{item.winsAway}</td>
                                <td className="centered">{item.drawsAway}</td>
                                <td className="centered">{item.lossesAway}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div>Goals Total: {item.goalsTotal + ' - ' + item.goalsTotalAllowed}</div>
                          <div>Goals Home: {item.goalsHome + ' - ' + item.goalsHomeAllowed}</div>
                          <div>Goals Away: {item.goalsAway + ' - ' + item.goalsAwayAllowed}</div>
                        </div>
        this.setState({summary: summary});
      })
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
    return (
      <div>
        <Link to="/">Home</Link>
        <h3 className="team-name">{this.state.team}</h3>
        <div className="control-statistics" onClick={this.handleClickOnTabs}>
          <div data-active="games-list" className="games-list-tab tablink active">Games list</div>
          <div data-active="summary" className="summary-tab tablink">Summary</div>
        </div>
        <div id="games-list" className="games-list tabcontent">
          {this.state.gamesList}
        </div>
        <div id="summary" className="summary tabcontent">
          {this.state.summary}
        </div>
      </div>
    );
  }
}

export default Team;
