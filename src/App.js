import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tableData: '',
      competitionsList: '',
      eventId: null,
      season: null,
      requestParams: {
        headers: {
        'X-Auth-Token': '5f800a66f45846cd95ff7351772e1f38'
        },
        type: 'GET',
        dataType: 'json'
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async ajaxCallInitialData () {
    // set previous year as a default
    const previousYear = new Date().getFullYear() - 1;
    let eventId = null;
    const URL = 'https://api.football-data.org/v1/competitions/?season=' + previousYear;
    await axios.get(URL, this.state.requestParams)
    .then((res) => {
      res.data.forEach((item)=> {
        // set english premier league as a default
        if (item.league === 'PL') {
          eventId = item.id;
        }
      })
      this.setState({season: previousYear, eventId: eventId});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ajaxCallCompetitions (season) {
    // get the links table
    const URL = 'https://api.football-data.org/v1/competitions/?season=' + season;
    axios.get(URL, this.state.requestParams)
    .then((res) => {
      const competitionsList = res.data.map((item, i) => {
        return <div 
                  className="link-to-event"
                  key={item.caption}
                  data-event-id={item.id}
                  onClick={this.handleClick}>
                    {item.caption}
                </div>
      });
      this.setState({competitionsList: competitionsList});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ajaxCallTableData (eventId) {
    const URL = 'https://api.football-data.org/v1/competitions/' + eventId + '/leagueTable';
    axios.get(URL, this.state.requestParams)
    .then((res) => {
      if(!Array.isArray(res.data.standing)) {
        return;
      }
      const tableData = res.data.standing.map((item, i) => {
        return <tr key={i}>
                <td>{item.position}</td>
                <td>{item.teamName}</td>
                <td className="centered">{item.playedGames}</td>
                <td className="centered">{item.wins}</td>
                <td className="centered">{item.draws}</td>
                <td className="centered">{item.losses}</td>
                <td className="centered">{item.goals + ' - ' + item.goalsAgainst}</td>
                <td className="centered">{item.points}</td>
              </tr>
      });
      this.setState({tableData: tableData});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleClick (event) {
    // get the ID of event from attribute 'data-event-id'
    const eventId = event.target.dataset.eventId;
    this.ajaxCallTableData(eventId);
 }


  async componentDidMount () {
    // firstable fetch an initial data, which others methods use
    await this.ajaxCallInitialData();
    this.ajaxCallCompetitions(this.state.season);
    this.ajaxCallTableData(this.state.eventId);
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
            <div> {this.state.season} </div>
            <div className="next">=&gt;</div>
          </div>
          {this.state.competitionsList}
        </div>
      </div>
    );
  }
}

export default App;
