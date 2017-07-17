import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      baseURL: 'https://raw.githubusercontent.com/morsko1/football-data-api/master/api/',
      season: '2016-2017/',
      seasonID: 1,
      league: 'england/premier-league/'
    };
    this.handleClickOnChampsList = this.handleClickOnChampsList.bind(this);
    this.handleClickOnSeasons = this.handleClickOnSeasons.bind(this);
  }

  ajaxCallChamps (season) {
    const URL = this.state.baseURL + season + 'championships.json';
    axios.get(URL)
    .then((res) => {
      const championshipsList = res.data.map((item, i) => {
        return <div 
                  className="link-to-event"
                  key={item.league}
                  data-event-league={item.league}
                  onClick={this.handleClickOnChampsList}>
                    {item.name}
                </div>
      });
      this.setState({championshipsList: championshipsList});
    })
    .catch((error) => console.log(error));
  }

  ajaxCallTableData (season, league) {
    const URL = this.state.baseURL + season + league + 'standings.json';
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
    })
    .catch((error) => console.log(error));
  }

  async handleClickOnChampsList (event) {
    const league = event.target.dataset.eventLeague;
    await this.setState({league: league});
    this.ajaxCallTableData(this.state.season, this.state.league);
  }

  async handleClickOnSeasons (event) {
    const value = event.target.className;
    let seasons;
    const URL = this.state.baseURL + 'seasons.json';
    await axios.get(URL)
    .then((res) => {
      seasons = res.data;
      this.setState({seasonMax: res.data.length - 1});
    })
    .catch((error) => console.log(error));

    if (value !== 'prev' && value !== 'next') return;
    if (value === 'prev') {
      if (this.state.seasonID === 0) return;
      await this.setState((prevState) => {
        return {seasonID: prevState.seasonID - 1,
                season: seasons[prevState.seasonID - 1].season + '/'};
      });
    } else if (value === 'next') {
      if (this.state.seasonID === this.state.seasonMax) return;
      await this.setState((prevState) => {
        return {seasonID: prevState.seasonID + 1,
                season: seasons[prevState.seasonID + 1].season + '/'};
      });
    }
    this.ajaxCallTableData(this.state.season, this.state.league);
  }

  componentDidMount () {
    this.ajaxCallChamps(this.state.season);
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
          <div className="season" onClick={this.handleClickOnSeasons}>
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
