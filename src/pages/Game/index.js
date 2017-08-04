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
      league: league,
      id: id
    });
  }

  ajaxCallGames (season, country, league, id) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/games-full.json`;
    axios.get(URL)
    .then ((res) => {
      const game = res.data.games[id];
      this.setState({game: game});
    })
    .catch((error) => console.log(error));
  }

  async componentDidMount() {
    await this.saveLinkPropsToState(this.props.match.params);
    this.ajaxCallGames (this.state.season, this.state.country, this.state.league, this.state.id);
  }

  render() {
    const game = this.state.game;
    if ('game' in this.state) {
      return (
        <div>
          <div className="centered">
            <Link to="/">Home</Link>
          </div>
          <br/>
          <div className="game">
            <div className="game-date">{game.date}</div>
            <div className="game-teams">
              <div className="game-home-team">
                <Link className="link-to-team" to={`../${game.homeTeam}`}>{game.homeTeam}</Link>
              </div>
              <div className="game-away-team">
                <Link className="link-to-team" to={`../${game.awayTeam}`}>{game.awayTeam}</Link>
              </div>
            </div>
            <div className="game-goals">
              <div className="game-home-team-goals">{game.fullTimeHomeTeamGoals}</div>
              <div className="game-away-team-goals">{game.fullTimeAwayTeamGoals}</div>
            </div>
            <div className="game-goals-half">
              <div className="game-home-team-goals">{'(' + game.halfTimeHomeTeamGoals + ')'}</div>
              <div className="game-away-team-goals">{'(' + game.halfTimeAwayTeamGoals + ')'}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamShots}</div>
              <div>shots</div>
              <div>{game.awayTeamShots}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamShotsOnTarget}</div>
              <div>shots on target</div>
              <div>{game.awayTeamShotsOnTarget}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamCorners}</div>
              <div>corners</div>
              <div>{game.awayTeamCorners}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamFouls}</div>
              <div>fouls</div>
              <div>{game.awayTeamFouls}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamYellowCards}</div>
              <div>yellow cards</div>
              <div>{game.awayTeamYellowCards}</div>
            </div>
            <div className="stat-line">
              <div>{game.homeTeamRedCards}</div>
              <div>red cards</div>
              <div>{game.awayTeamRedCards}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Team;
