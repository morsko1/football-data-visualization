import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as Constants from '../../constants/';

// *************************summary properties****************
// numOfGames
// fullTimeHomeTeamWins
// fullTimeDraws
// fullTimeAwayTeamWins
// halfTimeHomeTeamWins
// halfTimeDraws
// halfTimeAwayTeamWins
// fullTimeHomeTeamGoals
// fullTimeAwayTeamGoals
// halfTimeHomeTeamGoals
// halfTimeAwayTeamGoals
// homeTeamShots
// awayTeamShots
// homeTeamShotsOnTarget
// awayTeamShotsOnTarget
// homeTeamCorners
// awayTeamCorners
// homeTeamFouls
// awayTeamFouls
// homeTeamYellowCards
// awayTeamYellowCards
// homeTeamRedCards
// awayTeamRedCard

class SummaryStatistics extends Component {
  render() {
    const summary = this.props.summary;

    const homeTeamWinsWidth = (summary.fullTimeHomeTeamWins / summary.numOfGames) * 100;
    const drawsWidth = (summary.fullTimeDraws / summary.numOfGames) * 100;
    const AwayTeamWinsWidth = (summary.fullTimeAwayTeamWins / summary.numOfGames) * 100;

    const halfTimeHomeTeamWinsWidth = (summary.halfTimeHomeTeamWins / summary.numOfGames) * 100;
    const halfTimeDrawsWidth = (summary.halfTimeDraws / summary.numOfGames) * 100;
    const halfTimeAwayTeamWinsWidth = (summary.halfTimeAwayTeamWins / summary.numOfGames) * 100;

    const goalsTotal = summary.fullTimeHomeTeamGoals + summary.fullTimeAwayTeamGoals;

    const fullTimeHomeTeamGoalsWidth = (summary.fullTimeHomeTeamGoals / goalsTotal) * 100;
    const fullTimeAwayTeamGoalsWidth = (summary.fullTimeAwayTeamGoals / goalsTotal) * 100;

    const halfTimeHomeTeamGoalsWidth = (summary.halfTimeHomeTeamGoals / goalsTotal) * 100;
    const halfTimeAwayTeamGoalsWidth = (summary.halfTimeAwayTeamGoals / goalsTotal) * 100;

    const shotsTotal = summary.homeTeamShots + summary.awayTeamShots;

    const homeTeamShotsWidth = (summary.homeTeamShots / shotsTotal) * 100;
    const awayTeamShotsWidth = (summary.awayTeamShots / shotsTotal) * 100;

    const homeTeamShotsOnTargetWidth = (summary.homeTeamShotsOnTarget / shotsTotal) * 100;
    const awayTeamShotsOnTargetWidth = (summary.awayTeamShotsOnTarget / shotsTotal) * 100;

    // const fullTimeHomeTeamGoalsSplittedWidth = (summary.fullTimeHomeTeamGoals / shotsTotal) * 100;
    // const fullTimeAwayTeamGoalsSplittedWidth = (summary.fullTimeAwayTeamGoals / shotsTotal) * 100;
    return (
      <div id="summary-statistics" className="tabcontent summary-statistics">
        <div className="summary-statistics-content">
          <table className="">
            <tbody>
              <tr>
                <td>Games</td>
                <td>{summary.numOfGames}</td>
              </tr>
              <tr>
                <td>Goals</td>
                <td>{summary.fullTimeHomeTeamGoals + summary.fullTimeAwayTeamGoals}</td>
              </tr>
              <tr>
                <td>Shots</td>
                <td>{summary.homeTeamShots + summary.awayTeamShots}</td>
              </tr>
              <tr>
                <td>Shots on target</td>
                <td>{summary.homeTeamShotsOnTarget + summary.awayTeamShotsOnTarget}</td>
              </tr>
              <tr>
                <td>Corners</td>
                <td>{summary.homeTeamCorners + summary.awayTeamCorners}</td>
              </tr>
              <tr>
                <td>Fouls</td>
                <td>{summary.homeTeamFouls + summary.awayTeamFouls}</td>
              </tr>
              <tr>
                <td>Yellow Cards</td>
                <td>{summary.homeTeamYellowCards + summary.awayTeamYellowCards}</td>
              </tr>
              <tr>
                <td>Red Cards</td>
                <td>{summary.homeTeamRedCards + summary.awayTeamRedCards}</td>
              </tr>
            </tbody>
          </table>
          <div className="title home-vs-away">Home VS Away</div>
          <br/>
          <div className="title">Full-time results:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: homeTeamWinsWidth + '%'}}>{summary.fullTimeHomeTeamWins || ''}</div>
            <div className="draws" style={{width: drawsWidth + '%'}}>{summary.fullTimeDraws || ''}</div>
            <div className="losses" style={{width: AwayTeamWinsWidth + '%'}}>{summary.fullTimeAwayTeamWins || ''}</div>
          </div>
          <br/>
          <div className="title">Half-time results:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: halfTimeHomeTeamWinsWidth + '%'}}>{summary.halfTimeHomeTeamWins || ''}</div>
            <div className="draws" style={{width: halfTimeDrawsWidth + '%'}}>{summary.halfTimeDraws || ''}</div>
            <div className="losses" style={{width: halfTimeAwayTeamWinsWidth + '%'}}>{summary.halfTimeAwayTeamWins || ''}</div>
          </div>
          <br/>
          <div className="title">Full-time goals:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: fullTimeHomeTeamGoalsWidth + '%'}}>{summary.fullTimeHomeTeamGoals || ''}</div>
            <div className="goals-allowed" style={{width: fullTimeAwayTeamGoalsWidth + '%'}}>{summary.fullTimeAwayTeamGoals || ''}</div>
          </div>
          <br/>
          <div className="title">Half-time goals:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: halfTimeHomeTeamGoalsWidth + '%'}}>{summary.halfTimeHomeTeamGoals || ''}</div>
            <div className="goals-allowed" style={{width: halfTimeAwayTeamGoalsWidth + '%'}}>{summary.halfTimeAwayTeamGoals || ''}</div>
          </div>
          <br/>
          <div className="title">Shots:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: homeTeamShotsWidth + '%'}}>{summary.homeTeamShots || ''}</div>
            <div className="goals-allowed" style={{width: awayTeamShotsWidth + '%'}}>{summary.awayTeamShots || ''}</div>
          </div>
          <br/>
          <div className="title">Shots on target:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: homeTeamShotsOnTargetWidth + '%'}}>{summary.homeTeamShotsOnTarget || ''}</div>
            <div className="goals-allowed" style={{width: awayTeamShotsOnTargetWidth + '%'}}>{summary.awayTeamShotsOnTarget || ''}</div>
          </div>
          <br/>
          {/*<div className="title">Goals:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: fullTimeHomeTeamGoalsSplittedWidth + '%'}}>{summary.fullTimeHomeTeamGoals || ''}</div>
            <div className="goals-allowed" style={{width: fullTimeAwayTeamGoalsSplittedWidth + '%'}}>{summary.fullTimeAwayTeamGoals || ''}</div>
          </div>
          <br/>*/}
        </div>
      </div>
    );
  }
}

export default SummaryStatistics;
