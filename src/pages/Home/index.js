import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Constants from '../../constants/';
import StandingsTable from './components/StandingsTable.js';
import ChampionshipsComponent from './components/ChampionshipsComponent.js';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // initialize state
    };
    this.handleClickOnChampionshipsList = this.handleClickOnChampionshipsList.bind(this);
    this.handleClickOnSeasons = this.handleClickOnSeasons.bind(this);
  }

  async ajaxCallInitialData () {
    // get season
    const URL = `${Constants.BASE_URL}seasons.json`;
    await axios.get(URL)
    .then ((res) => {
      this.setState({
        season: res.data[res.data.length - 1].season,
        seasons: res.data,
        seasonID: res.data.length - 1,
        seasonMax: res.data.length - 1
      });
    })
    .catch((error) => console.log(error));

    // get league path
    const URL2 = `${Constants.BASE_URL}${this.state.season}/championships.json`;
    await axios.get(URL2)
    .then ((res) => {
      this.setState({
        country: res.data[0].country,
        league: res.data[0].league
      });
    })
    .catch((error) => console.log(error));
  }

  ajaxCallChampionships (season) {
    const URL = `${Constants.BASE_URL}${season}/championships.json`;
    axios.get(URL)
    .then((res) => {
      const championshipsList = res.data.map((item, i) => {
        return <div 
                  className="link-to-event"
                  key={item.league}
                  data-country={item.country}// атрибут: путь к конкретной стране, для функции handleClickOnChampionshipsList
                  data-league={item.league}// атрибут: путь к конкретной лиге, для функции handleClickOnChampionshipsList
                  onClick={this.handleClickOnChampionshipsList}>
                    {item.name}
                </div>
      });
      this.setState({championshipsList: championshipsList});
    })
    .catch((error) => console.log(error));
  }

  ajaxCallTableData (season, country, league) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    axios.get(URL)
    .then((res) => {
      const tableData = res.data.standings.map((item, i) => {
        return <tr key={i}>
                <td>{i + 1}</td>
                {/*ссылка на конкретную команду*/}
                <td><Link to={`${season}/${country}/${league}/${item.name}`} >{item.name}</Link></td>
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

  async handleClickOnChampionshipsList (event) {
    await this.setState({
      country: event.target.dataset.country,
      league: event.target.dataset.league
    });
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  async handleClickOnSeasons (event) {
    const targetValue = event.target.className;// какая кнопка нажата (класс)
    const seasons = this.state.seasons;
    if (targetValue !== 'prev' && targetValue !== 'next') return;// мимо кнопок - return
    if (targetValue === 'prev') {// нажата кнопка 'предидущий'
      if (this.state.seasonID === 0) return;// если сезон первый - return
      await this.setState((prevState) => {
        return {
          seasonID: prevState.seasonID - 1,
          season: seasons[prevState.seasonID - 1].season
        };
      });
    } else if (targetValue === 'next') {// нажата кнопка 'следующий'
      if (this.state.seasonID === this.state.seasonMax) return;// если сезон последний - return
      await this.setState((prevState) => {
        return {
          seasonID: prevState.seasonID + 1,
          season: seasons[prevState.seasonID + 1].season
        };
      });
    }
    // сразу же перерисовываем таблицу с новыми данными
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  async componentDidMount () {
    await this.ajaxCallInitialData();
    this.ajaxCallChampionships(this.state.season);
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  render() {
    return (
      <div>
        <StandingsTable tableData={this.state.tableData} />
        <ChampionshipsComponent
          handleClickOnSeasons={this.handleClickOnSeasons}
          seasonView={this.state.season}
          championshipsList={this.state.championshipsList} />
      </div>
    );
  }
}

export default Home;
