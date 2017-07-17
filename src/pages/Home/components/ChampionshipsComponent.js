import React, { Component } from 'react';

class ChampionshipsList extends Component {

  render() {
    return (
      <div className="abs-right">
        <div className="season" onClick={this.props.handleClickOnSeasons}>
          <div className="prev">&lt;=</div>
          <div> {this.props.seasonView} </div>
          <div className="next">=&gt;</div>
        </div>
        {this.props.championshipsList}
      </div>
    );
  }
}

export default ChampionshipsList;
