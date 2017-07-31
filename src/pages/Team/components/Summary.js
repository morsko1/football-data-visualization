import React, { Component } from 'react';

class Summary extends Component {
  render() {
    const summary = this.props.summary;

    const winsWidth = (summary.wins / summary.games) * 100;
    const drawsWidth = (summary.draws / summary.games) * 100;
    const lossesWidth = (summary.losses / summary.games) * 100;

    const winsHomeWidth = (summary.winsHome / (summary.games/2)) * 100;
    const drawsHomeWidth = (summary.drawsHome / (summary.games/2)) * 100;
    const lossesHomeWidth = (summary.lossesHome / (summary.games/2)) * 100;

    const winsAwayWidth = (summary.winsAway / (summary.games/2)) * 100;
    const drawsAwayWidth = (summary.drawsAway / (summary.games/2)) * 100;
    const lossesAwayWidth = (summary.lossesAway / (summary.games/2)) * 100;
//если значение равно 0, то не рендерить элемент

    return (
      <div id="summary" className="summary tabcontent">
        <div className="summary-content">
          <div>Games: {summary.games}</div>
          {/*<div>Goals scored: {summary.goalsTotal}</div>
          <div>Goals allowed: {summary.goalsTotalAllowed}</div>*/}
          <div>Fulltime results:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsWidth + '%'}}>{summary.wins}</div>
            <div className="draws" style={{width: drawsWidth + '%'}}>{summary.draws}</div>
            <div className="losses" style={{width: lossesWidth + '%'}}>{summary.losses}</div>
          </div>
          <div>Fulltime results home:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsHomeWidth + '%'}}>{summary.winsHome}</div>
            <div className="draws" style={{width: drawsHomeWidth + '%'}}>{summary.drawsHome}</div>
            <div className="losses" style={{width: lossesHomeWidth + '%'}}>{summary.lossesHome}</div>
          </div>
          <div>Fulltime results away:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsAwayWidth + '%'}}>{summary.winsAway}</div>
            <div className="draws" style={{width: drawsAwayWidth + '%'}}>{summary.drawsAway}</div>
            <div className="losses" style={{width: lossesAwayWidth + '%'}}>{summary.lossesAway}</div>
          </div>
          {/*<table className="ftr-table">
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
                <td className="centered">{summary.wins}</td>
                <td className="centered">{summary.draws}</td>
                <td className="centered">{summary.losses}</td>
              </tr>
              <tr>
                <td colSpan={3} className="centered">Home</td>
              </tr>
              <tr>
                <td className="centered">{summary.winsHome}</td>
                <td className="centered">{summary.drawsHome}</td>
                <td className="centered">{summary.lossesHome}</td>
              </tr>
              <tr>
                <td colSpan={3} className="centered">Away</td>
              </tr>
              <tr>
                <td className="centered">{summary.winsAway}</td>
                <td className="centered">{summary.drawsAway}</td>
                <td className="centered">{summary.lossesAway}</td>
              </tr>
            </tbody>
          </table>*/}
          <div>Goals Total: {summary.goalsTotal + ' - ' + summary.goalsTotalAllowed}</div>
          <div>Goals Home: {summary.goalsHome + ' - ' + summary.goalsHomeAllowed}</div>
          <div>Goals Away: {summary.goalsAway + ' - ' + summary.goalsAwayAllowed}</div>
        </div>
      </div>
    );
  }
}

export default Summary;
