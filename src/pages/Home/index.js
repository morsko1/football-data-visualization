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
      // инициализация state
    };
    this.handleClickOnChampionshipsList = this.handleClickOnChampionshipsList.bind(this);
    this.handleClickOnSeasons = this.handleClickOnSeasons.bind(this);
  }

  // этот метод запрашивает начальные данные и записывает их в state и sessionStorage
  async ajaxCallInitialData () {
    // получаем свойства season, seasons, seasonID, seasonMax
    const URL = `${Constants.BASE_URL}seasons.json`;
    await axios.get(URL)
    .then ((res) => {
      this.setState({
        season: res.data[res.data.length - 1].season,
        seasons: res.data,
        seasonID: res.data.length - 1,
        seasonMax: res.data.length - 1
      });
      // записываем в sessionStorage
      sessionStorage.setItem('season', res.data[res.data.length - 1].season);
      sessionStorage.setItem('seasons', JSON.stringify(res.data));// seasons - массив, требует сериализации
      sessionStorage.setItem('seasonID', res.data.length - 1);
      sessionStorage.setItem('seasonMax', res.data.length - 1);
    })
    .catch((error) => console.log(error));

    // получаем свойства country и league
    const URL2 = `${Constants.BASE_URL}${this.state.season}/championships.json`;
    await axios.get(URL2)
    .then ((res) => {
      this.setState({
        country: res.data[0].country,
        league: res.data[0].league
      });
      // записываем в sessionStorage
      sessionStorage.setItem('country', res.data[0].country);
      sessionStorage.setItem('league', res.data[0].league);
    })
    .catch((error) => console.log(error));
  }

  // этот метод создает массив ссылок на чемпионаты, доступные в текущем сезоне, сохраняет его в state для послудующей передачи его в компонент ChampionshipsComponent
  ajaxCallChampionships (season) {
    const URL = `${Constants.BASE_URL}${season}/championships.json`;
    axios.get(URL)
    .then((res) => {
      const championshipsList = res.data.map((item, i) => {
        const additionClass = (sessionStorage.getItem('league') === item.league) ? 'active': '';
        return <div 
                  className={'link-to-championship ' + additionClass}// .active для активной ссылки
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

  // этот метод создает массив строк турнирной таблицы и сохраняет его в state для послудующей передачи его в компонент StandingsTable
  ajaxCallTableData (season, country, league) {
    const URL = `${Constants.BASE_URL}${season}/${country}/${league}/standings.json`;
    axios.get(URL)
    .then((res) => {
      const tableData = res.data.standings.map((item, i) => {
        return <tr key={i}>
                <td>{i + 1}</td>
                {/*ссылка на конкретную команду*/}
                <td><Link to={`${season}/${country}/${league}/${item.name}`} className="link-to-team">{item.name}</Link></td>
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

  // метод - обработчик клика на списке доступных чемпионатов. Кликнутая ссылка подсвечивается и отрисовывается таблица данного чемпионата
  async handleClickOnChampionshipsList (event) {
    // подсветка активной ссылки
    const target = event.target;
    if (target.classList.contains('active')) return;
    const parent = target.parentElement;
    for (let i=0; i<parent.children.length; i++) {
      const elem = parent.children[i];
      elem.classList.remove('active');
    }
    target.classList.add('active');

    await this.setState({
      country: event.target.dataset.country,
      league: event.target.dataset.league
    });
    sessionStorage.setItem('country', this.state.country);
    sessionStorage.setItem('league', this.state.league);
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  // метод для смены текущего сезона
  async handleClickOnSeasons (event) {
    const targetValue = event.target.className;// какая кнопка нажата (класс)
    const seasons = this.state.seasons;
    if (targetValue !== 'prev' && targetValue !== 'next') return;// мимо кнопок - return
    if (targetValue === 'prev') {// нажата кнопка 'предидущий'
      if (this.state.seasonID === 0) return;// если сезон первый - return
      await this.setState((prevState) => {
        return {
          seasonID: parseInt(prevState.seasonID, 10) - 1,
          season: seasons[parseInt(prevState.seasonID, 10) - 1].season
        };
      });
    } else if (targetValue === 'next') {// нажата кнопка 'следующий'
      if (this.state.seasonID === this.state.seasonMax) return;// если сезон последний - return
      await this.setState((prevState) => {
        return {
          seasonID: parseInt(prevState.seasonID, 10) + 1,
          season: seasons[parseInt(prevState.seasonID, 10) + 1].season
        };
      });
    }
    sessionStorage.setItem('seasonID', this.state.seasonID);
    sessionStorage.setItem('season', this.state.season);
    // сразу же перерисовываем таблицу с новыми данными
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  async componentDidMount () {
    // если есть данные в sessionStorage, то загрузить их оттуда в state
    if (sessionStorage.getItem('season')) {
      await this.setState({season: sessionStorage.getItem('season')});
      const seasons = JSON.parse(sessionStorage.getItem('seasons'));// seasons - сериализованный массив, нужно распарсить
      await this.setState({seasons: seasons});
      const seasonID = parseInt(sessionStorage.getItem('seasonID'), 10);// convert to Number
      await this.setState({seasonID: seasonID});
      const seasonMax = parseInt(sessionStorage.getItem('seasonMax'), 10);// convert to Number
      await this.setState({seasonMax: seasonMax});
      await this.setState({country: sessionStorage.getItem('country')});
      await this.setState({league: sessionStorage.getItem('league')});
    } else {// иначе - загрузить данные через запрос к API
      await this.ajaxCallInitialData();
    }
    this.ajaxCallChampionships(this.state.season);
    this.ajaxCallTableData(this.state.season, this.state.country, this.state.league);
  }

  render() {
    return (
      <div>
        <ChampionshipsComponent
          handleClickOnSeasons={this.handleClickOnSeasons}
          seasonView={this.state.season}
          championshipsList={this.state.championshipsList} />
        <div className="centered">
          <Link className="link-to-summary" to={`${this.state.season}/${this.state.country}/${this.state.league}`}>Summary of championship</Link>
        </div>
        <br/>
        <StandingsTable
          tableData={this.state.tableData} />
      </div>
    );
  }
}

export default Home;
