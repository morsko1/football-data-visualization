import React, { Component } from 'react';

class StandingsTable extends Component {

  render() {
    return (
      <table>
        <caption>{this.props.tableCaption}</caption>
        <tbody>
          <tr>
            <th>Место</th>
            <th>Команда</th>
            <th>Игры</th>
            <th>В</th>
            <th>Н</th>
            <th>П</th>
            <th>Голы</th>
            <th>Очки</th>
          </tr>
          {this.props.tableData}
        </tbody>
      </table>
    );
  }
}

export default StandingsTable;
