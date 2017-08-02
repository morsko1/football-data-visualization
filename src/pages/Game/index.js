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
    const date = ('game' in this.state) ? this.state.game.date : null;
    const homeTeam = ('game' in this.state) ? this.state.game.homeTeam : null;
    const awayTeam = ('game' in this.state) ? this.state.game.awayTeam : null;
    const fullTimeHomeTeamGoals = ('game' in this.state) ? this.state.game.fullTimeHomeTeamGoals : null;
    const fullTimeAwayTeamGoals = ('game' in this.state) ? this.state.game.fullTimeAwayTeamGoals : null;
    const halfTimeHomeTeamGoals = ('game' in this.state) ? this.state.game.halfTimeHomeTeamGoals : null;
    const halfTimeAwayTeamGoals = ('game' in this.state) ? this.state.game.halfTimeAwayTeamGoals : null;
    const homeTeamShots = ('game' in this.state) ? this.state.game.homeTeamShots : null;
    const awayTeamShots = ('game' in this.state) ? this.state.game.awayTeamShots : null;
    const homeTeamShotsOnTarget = ('game' in this.state) ? this.state.game.homeTeamShotsOnTarget : null;
    const awayTeamShotsOnTarget = ('game' in this.state) ? this.state.game.awayTeamShotsOnTarget : null;
    const homeTeamCorners = ('game' in this.state) ? this.state.game.homeTeamCorners : null;
    const awayTeamCorners = ('game' in this.state) ? this.state.game.awayTeamCorners : null;
    const homeTeamFouls = ('game' in this.state) ? this.state.game.homeTeamFouls : null;
    const awayTeamFouls = ('game' in this.state) ? this.state.game.awayTeamFouls : null;
    const homeTeamYellowCards = ('game' in this.state) ? this.state.game.homeTeamYellowCards : null;
    const awayTeamYellowCards = ('game' in this.state) ? this.state.game.awayTeamYellowCards : null;
    const homeTeamRedCards = ('game' in this.state) ? this.state.game.homeTeamRedCards : null;
    const awayTeamRedCards = ('game' in this.state) ? this.state.game.awayTeamRedCards : null;
    return (
      <div className="game">
        <div className="game-date">{date}</div>
        <div className="game-teams">
          <div className="game-home-team">
            <Link className="link-to-team" to={`../${homeTeam}`}>{homeTeam}</Link>
          </div>
          <div className="game-away-team">
            <Link className="link-to-team" to={`../${awayTeam}`}>{awayTeam}</Link>
          </div>
        </div>
        <div className="game-goals">
          <div className="game-home-team-goals">{fullTimeHomeTeamGoals}</div>
          <div className="game-away-team-goals">{fullTimeAwayTeamGoals}</div>
        </div>
        <div className="game-goals-half">
          <div className="game-home-team-goals">{'(' + halfTimeHomeTeamGoals + ')'}</div>
          <div className="game-away-team-goals">{'(' + halfTimeAwayTeamGoals + ')'}</div>
        </div>
      </div>
    );
  }
}

export default Team;
