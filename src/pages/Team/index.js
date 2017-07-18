import React, { Component } from 'react';

class Team extends Component {
  render() {
    const season = this.props.match.params.season;
    const country = this.props.match.params.country;
    const league = this.props.match.params.league;
    const team = this.props.match.params.team;
    return (
      <div>
        <h3>Team component</h3>
        <h3>{season}</h3>
        <h3>{country}</h3>
        <h3>{league}</h3>
        <h3>{team}</h3>
      </div>
    );
  }
}

export default Team;
