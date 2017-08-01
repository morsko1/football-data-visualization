import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GamesList extends Component {
  render() {
    const team = this.props.team;
    const list = this.props.gamesList.map((item, i) => {
      let color = '';
      if (item.homeTeam === team) {
        switch (item.fullTimeResult) {
          case 'H':
            color = 'green';
            break;
          case 'A':
            color = 'red';
            break;
          default:
            color = 'grey';
            break;
        }
      } else {
        switch (item.fullTimeResult) {
          case 'H':
            color = 'red';
            break;
          case 'A':
            color = 'green';
            break;
          default:
            color = 'grey';
            break;
        }
      }

      return <div key={item.date} className="game-single" style={{borderRight: '10px solid ' +  color}}>
              <span className="game-num">{i+1}</span>
              <div className="game-date">{item.date}</div>
              <div className="game-teams">
                <div className="game-home-team">
                  <Link className="link-to-team" to={`${item.homeTeam}`} onClick={this.props.goTo.bind(this, item.homeTeam)}>{item.homeTeam}</Link>
                </div>
                <div className="game-away-team">
                  <Link className="link-to-team" to={`${item.awayTeam}`} onClick={this.props.goTo.bind(this, item.awayTeam)}>{item.awayTeam}</Link>
                </div>
              </div>
              <div className="game-goals">
                <div className="game-home-team-goals">{item.fullTimeHomeTeamGoals}</div>
                <div className="game-away-team-goals">{item.fullTimeAwayTeamGoals}</div>
              </div>
            </div>
    });
    return(
      <div id="games-list" className="games-list tabcontent">
        {list}
      </div>
    );
  }
}

export default GamesList;
