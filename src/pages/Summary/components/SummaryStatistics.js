import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as Constants from '../../constants/';

class SummaryStatistics extends Component {
  render() {
    const summary = this.props.summary;
    return (
      <div id="summary-statistics" className="tabcontent summary-statistics">
        <div className="summary-statistics-content">Games: {summary.numOfGames}</div>
      </div>
    );
  }
}

export default SummaryStatistics;
