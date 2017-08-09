import React, { Component } from 'react';

class ComparingTeams extends Component {
  render() {
    const teams = this.props.teams;
    const valueSelect = this.props.valueSelect;
    const sortTeams = this.props.sortTeams;

    const optionsList = [];
    for (const prop in teams[0]) {
      if (prop === 'id' || prop === 'name') continue;
      const option = <option
                        value={prop}
                        key={prop}>
                          {/*'camelCase' => 'Camel Case'*/}
                          {prop.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </option>;
      optionsList.push(option);
    }

    const maxValue = teams[0][valueSelect];
    const teamsList = teams.map((team) => {
      return (
        <div
          className="teams-list-line"
          key={team.id}>
            <div className="teams-list-name">{team.name}</div>
            <div className="teams-list-value-container">
              <div
                className="teams-list-value"
                style={{
                  width: ((team[valueSelect] / maxValue) * 100) + '%',
                  //если значение нулевое -> не показывать элемент
                  display: (team[valueSelect]) ? 'block' : 'none'
                }}>
                  {team[valueSelect]}
              </div>
            </div>
        </div>
      );
    });
    return (
      <div
        id="comparing-teams"
        className="comparing-teams tabcontent">
          <div className="comparing-teams-content">
            Order by&nbsp;
            <select
              name="teams"
              onChange={sortTeams}
              value={valueSelect}>
                {optionsList}
            </select>
            <div className="teams-list">
              {teamsList}
            </div>
          </div>
      </div>
    );
  }
}

export default ComparingTeams;
