import React, { Component } from 'react';

class StandingsTable extends Component {

  render() {
    return (
      <table className="standings-table">
        <caption>{this.props.tableCaption}</caption>
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>G</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Goals</th>
            <th>Pts</th>
          </tr>
          {this.props.tableData}
        </tbody>
      </table>
    );
  }
}

export default StandingsTable;
