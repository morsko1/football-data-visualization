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

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    await this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.team);
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <h3 className="team-name">{this.state.team}</h3>
        <div className="control-statistics">
          <div className="games-list active">Games list</div>
          <div className="summary">Summary</div>
        </div>
        <div className="games-list">
          {this.state.gamesList}
        </div>
      </div>
    );
  }
}

export default Team;
