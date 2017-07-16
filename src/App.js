import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      baseURL: 'https://raw.githubusercontent.com/morsko1/football-data-api/master/api/',
      season: '2016-2017/',
      league: 'england/premier-league/'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  ajaxCallCompetitions (season) {
    const URL = 'https://raw.githubusercontent.com/morsko1/football-data-api/master/api/' + season + 'championships.json';
    axios.get(URL)
    .then((res) => {
      const championshipsList = res.data.map((item, i) => {
        return <div 
                  className="link-to-event"
                  key={item.league}
                  data-event-league={item.league}
                  onClick={this.handleClick}>
                    {item.name}
                </div>
      });
      this.setState({championshipsList: championshipsList});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ajaxCallTableData (season, league) {
    const URL = 'https://raw.githubusercontent.com/morsko1/football-data-api/master/api/' + season + league + 'standings.json';
    axios.get(URL)
    .then((res) => {
      const tableData = res.data.standings.map((item, i) => {
        return <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td className="centered">{item.games}</td>
                <td className="centered">{item.wins}</td>
                <td className="centered">{item.draws}</td>
                <td className="centered">{item.losses}</td>
                <td className="centered">{item.goalsTotal + ' - ' + item.goalsTotalAllowed}</td>
                <td className="centered">{item.pointsTotal}</td>
              </tr>
      });
      this.setState({tableData: tableData});
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

   async handleClick (event) {
    const league = event.target.dataset.eventLeague;
    await this.setState({league: league});
    this.ajaxCallTableData(this.state.season, this.state.league);
 }


  componentDidMount () {
    this.ajaxCallCompetitions(this.state.season);
    this.ajaxCallTableData(this.state.season, this.state.league);
  }
  render() {
    return (
      <div>
        <table>
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
            {this.state.tableData}
          </tbody>
        </table>
        <div className="abs-right">
          <div className="season">
            <div className="prev">&lt;=</div>
            <div> {(this.state.season).slice(0, -1)} </div>
            <div className="next">=&gt;</div>
          </div>
          {this.state.championshipsList}
        </div>
      </div>
    );
  }
}

export default App;
