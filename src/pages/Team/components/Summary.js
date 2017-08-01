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

    const goalsScoredWidth = (summary.goalsTotal / (summary.goalsTotal + summary.goalsTotalAllowed)) * 100;
    const goalsAllowedWidth = (summary.goalsTotalAllowed / (summary.goalsTotal + summary.goalsTotalAllowed)) * 100;

    const goalsScoredHomeWidth = (summary.goalsHome / (summary.goalsHome + summary.goalsHomeAllowed)) * 100;
    const goalsAllowedHomeWidth = (summary.goalsHomeAllowed / (summary.goalsHome + summary.goalsHomeAllowed)) * 100;

    const goalsScoredAwayWidth = (summary.goalsAway / (summary.goalsAway + summary.goalsAwayAllowed)) * 100;
    const goalsAllowedAwayWidth = (summary.goalsAwayAllowed / (summary.goalsAway + summary.goalsAwayAllowed)) * 100;

    return (
      <div id="summary" className="summary tabcontent">
        <div className="summary-content">
          <div className="title">Games: {summary.games}</div>
          <br/>
          <div className="title">Fulltime results:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsWidth + '%'}}>{summary.wins || ''}</div>
            <div className="draws" style={{width: drawsWidth + '%'}}>{summary.draws || ''}</div>
            <div className="losses" style={{width: lossesWidth + '%'}}>{summary.losses || ''}</div>
          </div>
          <div className="title">Fulltime results home:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsHomeWidth + '%'}}>{summary.winsHome || ''}</div>
            <div className="draws" style={{width: drawsHomeWidth + '%'}}>{summary.drawsHome || ''}</div>
            <div className="losses" style={{width: lossesHomeWidth + '%'}}>{summary.lossesHome || ''}</div>
          </div>
          <div className="title">Fulltime results away:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsAwayWidth + '%'}}>{summary.winsAway || ''}</div>
            <div className="draws" style={{width: drawsAwayWidth + '%'}}>{summary.drawsAway || ''}</div>
            <div className="losses" style={{width: lossesAwayWidth + '%'}}>{summary.lossesAway || ''}</div>
          </div>
          <br/>
          <div className="title">Goals total:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: goalsScoredWidth + '%'}}>{summary.goalsTotal || ''}</div>
            <div className="losses" style={{width: goalsAllowedWidth + '%'}}>{summary.goalsTotalAllowed || ''}</div>
          </div>
          <div className="title">Goals home:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: goalsScoredHomeWidth + '%'}}>{summary.goalsHome || ''}</div>
            <div className="losses" style={{width: goalsAllowedHomeWidth + '%'}}>{summary.goalsHomeAllowed || ''}</div>
          </div>
          <div className="title">Goals away:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: goalsScoredAwayWidth + '%'}}>{summary.goalsAway || ''}</div>
            <div className="losses" style={{width: goalsAllowedAwayWidth + '%'}}>{summary.goalsAwayAllowed || ''}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
