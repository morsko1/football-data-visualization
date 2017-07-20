import React, { Component } from 'react';

class Summary extends Component {
  render() {
    const summary = this.props.summary;
    return (
      <div id="summary" className="summary tabcontent">
        <div className="summary-content">
          <div>Games: {summary.games}</div>
          <div>Goals scored: {summary.goalsTotal}</div>
          <div>Goals allowed: {summary.goalsTotalAllowed}</div>
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
          </table>
          <div>Goals Total: {summary.goalsTotal + ' - ' + summary.goalsTotalAllowed}</div>
          <div>Goals Home: {summary.goalsHome + ' - ' + summary.goalsHomeAllowed}</div>
          <div>Goals Away: {summary.goalsAway + ' - ' + summary.goalsAwayAllowed}</div>
        </div>
      </div>
    );
  }
}

export default Summary;
