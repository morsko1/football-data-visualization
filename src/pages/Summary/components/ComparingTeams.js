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

    const teamsList = teams.map((item) => {
      return <div key={item.id}>
                {item.name} - {item[valueSelect]}
              </div>
    });
    return (
      <div
        id="comparing-teams"
        className="comparing-teams tabcontent">
          <div className="comparing-teams-content">
            Order by 
            <select
              name="teams"
              onChange={sortTeams}
              value={valueSelect}>
                {optionsList}
            </select>
            {teamsList}
          </div>
      </div>
    );
  }
}

export default ComparingTeams;
