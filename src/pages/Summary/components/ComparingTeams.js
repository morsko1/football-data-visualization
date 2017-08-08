import React, { Component } from 'react';

class ComparingTeams extends Component {
  render() {
    const teams = this.props.teams;
    const valueSelect = this.props.valueSelect;
    const sortTeams = this.props.sortTeams;

    const optionsList = [];
    for (let prop in teams[0]) {
      if (prop === 'id' || prop === 'name') continue;
      const opt = <option
                    value={prop}
                    key={prop}>
                      {prop.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}{/*camelCase => Camel Case*/}
                  </option>;
      optionsList.push(opt);
    }

    const maxValue = teams[0][valueSelect];
    const teamsList = teams.map((item) => {
      return <div
                className="teams-list-line"
                key={item.id}>
                  <div className="teams-list-name">{item.name}</div>
                  <div className="teams-list-value-container">
                    <div 
                      className="teams-list-value"
                      style={{width: ((item[valueSelect] / maxValue) * 100) + '%'}}>
                      {item[valueSelect] || ''}
                    </div>
                  </div>
              </div>
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
            <br/>
            <div className="teams-list">
              {teamsList}
            </div>
          </div>
      </div>
    );
  }
}

export default ComparingTeams;
