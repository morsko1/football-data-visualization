import React, { Component } from 'react';

class ChampionshipsComponent extends Component {

  render() {
    return (
      <div className="championships-component">
        <div
          className="season"
          onClick={this.props.handleClickOnSeasons}>
            <div className="prev">&lt;=</div>
            <div> {this.props.seasonView} </div>
            <div className="next">=&gt;</div>
        </div>
        <div className="championships-list">
          {this.props.championshipsList}
        </div>
      </div>
    );
  }
}

export default ChampionshipsComponent;
