import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as Constants from '../../constants/';

class SummaryStatistics extends Component {
  render() {
    const summary = this.props.summary;
    return (
      <div id="summary-statistics" className="tabcontent">
        <div className="centered">
          <h3>Summary of Championship</h3>
          <div>{this.props.seasonView}</div>
          <div>{this.props.leagueView}</div>
        </div>
        <div className="summary-statistics">
          Games: {summary.numOfGames}
        </div>
      </div>
    );
  }
}

export default SummaryStatistics;
