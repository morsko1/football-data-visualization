import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../constants/'
import StandingsTable from './components/StandingsTable.js'

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
    const URL = Constants.BASE_URL + 'seasons.json';
    await axios.get(URL)
    .then ((res) => {
      const seasonID = res.data.length - 1;
      this.setState({
        seasonID: seasonID,
        seasonPath: res.data[res.data.length - 1].season + '/',
        seasonView: res.data[res.data.length - 1].season
      });
    })
    .catch((error) => console.log(error));

    // get league path
    const URL2 = Constants.BASE_URL + this.state.seasonPath + 'championships.json';
    await axios.get(URL2)
    .then ((res) => {
      const leaguePath = res.data[0].league;
      this.setState({leaguePath: leaguePath});
    })
    .catch((error) => console.log(error));
  }

  ajaxCallChampionships (season) {
    const URL = Constants.BASE_URL + season + 'championships.json';
    axios.get(URL)
    .then((res) => {
      const championshipsList = res.data.map((item, i) => {
        return <div 
                  className="link-to-event"
                  key={item.league}
                  data-league-path={item.league}// атрибут: путь к конкретной лиге, используется в фенкции handleClickOnChampionshipsList
                  onClick={this.handleClickOnChampionshipsList}>
                    {item.name}
                </div>
      });
      this.setState({championshipsList: championshipsList});
    })
    .catch((error) => console.log(error));
  }

  ajaxCallTableData (season, league) {
    const URL = Constants.BASE_URL + season + league + 'standings.json';
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

  async handleClickOnChampionshipsList (event) {
    const leaguePath = event.target.dataset.leaguePath;
    await this.setState({leaguePath: leaguePath});
    this.ajaxCallTableData(this.state.seasonPath, this.state.leaguePath);
  }

  async handleClickOnSeasons (event) {
    const targetValue = event.target.className;
    let seasons;
    const URL = Constants.BASE_URL + 'seasons.json';
    await axios.get(URL)
    .then((res) => {
      seasons = res.data;
      this.setState({seasonMax: seasons.length - 1});
    })
    .catch((error) => console.log(error));

    if (targetValue !== 'prev' && targetValue !== 'next') return;
    if (targetValue === 'prev') {// нажата кнопка 'предидущий'
      if (this.state.seasonID === 0) return;// если сезон первый - return
      await this.setState((prevState) => {
        return {seasonID: prevState.seasonID - 1,
                seasonPath: seasons[prevState.seasonID - 1].season + '/',
                seasonView: seasons[prevState.seasonID - 1].season
        };
      });
    } else if (targetValue === 'next') {// нажата кнопка 'следующий'
      if (this.state.seasonID === this.state.seasonMax) return;// если сезон последний - return
      await this.setState((prevState) => {
        return {seasonID: prevState.seasonID + 1,
                seasonPath: seasons[prevState.seasonID + 1].season + '/',
                seasonView: seasons[prevState.seasonID + 1].season
        };
      });
    }
    this.ajaxCallTableData(this.state.seasonPath, this.state.leaguePath);
  }

  async componentDidMount () {
    await this.ajaxCallInitialData();
    this.ajaxCallChampionships(this.state.seasonPath);
    this.ajaxCallTableData(this.state.seasonPath, this.state.leaguePath);
  }

  render() {
    return (
      <div>
        <StandingsTable tableData={this.state.tableData} />
        <div className="abs-right">
          <div className="season" onClick={this.handleClickOnSeasons}>
            <div className="prev">&lt;=</div>
            <div> {this.state.seasonView} </div>
            <div className="next">=&gt;</div>
          </div>
          {this.state.championshipsList}
        </div>
      </div>
    );
  }

}

export default Home;
