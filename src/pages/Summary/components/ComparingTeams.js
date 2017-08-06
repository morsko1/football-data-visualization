import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as Constants from '../../constants/';

class ComparingTeams extends Component {
  render() {
    return (
      <div id="comparing-teams" className="comparing-teams tabcontent">
        <div className="comparing-teams-content">
          Order by <select name="teams" id="" onChange={this.props.sortTeams}>
            <option value="pointsTotal" defaultValue>points</option>
            <option value="wins">wins</option>
            <option value="draws">draws</option>
            <option value="losses">losses</option>
            <option value="goalsTotal">goals scored</option>
            <option value="goalsTotalAllowed">goals allowed</option>
            <option value="winsHome">wins home</option>
            <option value="drawsHome">draws home</option>
            <option value="lossesHome">losses home</option>
            <option value="goalsHome">goals scored home</option>
            <option value="goalsHomeAllowed">goals allowed home</option>
            <option value="winsAway">wins away</option>
            <option value="drawsAway">draws away</option>
            <option value="lossesAway">losses away</option>
            <option value="goalsAway">goals scored away</option>
            <option value="goalsAwayAllowed">goals allowed away</option>
          </select>
          {this.props.teams.map((item) => {
            return <div key={item.id}>
                      {item.name} - {item[this.props.valueSelect]}
                    </div>
          })}
        </div>
      </div>
    );
  }
}

export default ComparingTeams;
