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

    const shotsWidth = (summary.shots / (summary.shots + summary.shotsAllowed)) * 100;
    const shotsAllowedWidth = (summary.shotsAllowed / (summary.shots + summary.shotsAllowed)) * 100;

    const shotsOnTargetWidth = (summary.shotsOnTarget / (summary.shots + summary.shotsAllowed)) * 100;
    const shotsOnTargetAllowedWidth = (summary.shotsOnTargetAllowed / (summary.shots + summary.shotsAllowed)) * 100;

    const cornersWidth = (summary.corners / (summary.corners + summary.cornersAllowed)) * 100;
    const cornersAllowedWidth = (summary.cornersAllowed / (summary.corners + summary.cornersAllowed)) * 100;

    const foulsWidth = (summary.fouls / (summary.fouls + summary.foulsAllowed)) * 100;
    const foulsAllowedWidth = (summary.foulsAllowed / (summary.fouls + summary.foulsAllowed)) * 100;

    const yellowCardsWidth = (summary.yellowCards / (summary.yellowCards + summary.yellowCardsAllowed)) * 100;
    const yellowCardsAllowedWidth = (summary.yellowCardsAllowed / (summary.yellowCards + summary.yellowCardsAllowed)) * 100;

    const redCardsWidth = (summary.redCards / (summary.redCards + summary.redCardsAllowed)) * 100;
    const redCardsAllowedWidth = (summary.redCardsAllowed / (summary.redCards + summary.redCardsAllowed)) * 100;

    return (
      <div id="summary-team" className="summary-team tabcontent">
        <div className="summary-team-content">
          <div className="title">Games: {summary.games}</div>
          <br/>
          <div className="title">Full-time results:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsWidth + '%'}}>{summary.wins || ''}</div>
            <div className="draws" style={{width: drawsWidth + '%'}}>{summary.draws || ''}</div>
            <div className="losses" style={{width: lossesWidth + '%'}}>{summary.losses || ''}</div>
          </div>
          <div className="title">Full-time results home:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: winsHomeWidth + '%'}}>{summary.winsHome || ''}</div>
            <div className="draws" style={{width: drawsHomeWidth + '%'}}>{summary.drawsHome || ''}</div>
            <div className="losses" style={{width: lossesHomeWidth + '%'}}>{summary.lossesHome || ''}</div>
          </div>
          <div className="title">Full-time results away:</div>
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
          <br/>
          <div className="title">Shots:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: shotsWidth + '%'}}>{summary.shots || ''}</div>
            <div className="losses" style={{width: shotsAllowedWidth + '%'}}>{summary.shotsAllowed || ''}</div>
          </div>
          <div className="title">Shots on target:</div>
          <div className="line-diagram-splitted">
            <div className="goals-scored" style={{width: shotsOnTargetWidth + '%'}}>{summary.shotsOnTarget || ''}</div>
            <div className="goals-allowed" style={{width: shotsOnTargetAllowedWidth + '%'}}>{summary.shotsOnTargetAllowed || ''}</div>
          </div>
          <br/>
           <div className="title">Corners:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: cornersWidth + '%'}}>{summary.corners || ''}</div>
            <div className="losses" style={{width: cornersAllowedWidth + '%'}}>{summary.cornersAllowed || ''}</div>
          </div>
          <div className="title">Fouls:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: foulsWidth + '%'}}>{summary.fouls || ''}</div>
            <div className="losses" style={{width: foulsAllowedWidth + '%'}}>{summary.foulsAllowed || ''}</div>
          </div>
          <div className="title">Yellow cards:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: yellowCardsWidth + '%'}}>{summary.yellowCards || ''}</div>
            <div className="losses" style={{width: yellowCardsAllowedWidth + '%'}}>{summary.yellowCardsAllowed || ''}</div>
          </div>
          <div className="title">Red cards:</div>
          <div className="line-diagram">
            <div className="wins" style={{width: redCardsWidth + '%'}}>{summary.redCards || ''}</div>
            <div className="losses" style={{width: redCardsAllowedWidth + '%'}}>{summary.redCardsAllowed || ''}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
