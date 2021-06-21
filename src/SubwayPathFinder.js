// eslint-disable-next-line import/extensions
import { STATIONS, LINES } from './data.js';
// eslint-disable-next-line import/extensions
import Dijkstra from './utils/Dijkstra.js';

export default class SubwayPathFinder {
  constructor() {
    this.STATIONS = STATIONS;
    this.LINES = LINES;
    this.render();
    this.$searchButton = document.querySelector('#search-button');
    this.$departureStationNameInput = document.querySelector('#departure-station-name-input');
    this.$arrivalStationNameInput = document.querySelector('#arrival-station-name-input');
    this.$searchType = document.querySelectorAll('input[name=search-type]');
    this.$result = document.querySelector('#result');
  }

  render() {
    this.$app = document.querySelector('#app');
    this.$app.innerHTML = '<h1>🚇 지하철 길찾기</h1>';
    this.$app.innerHTML += '    <form>\n'
      + '        <p><label for="departure-station-name-input">출발역</label><input type="text" id="departure-station-name-input" /></p>\n'
      + '        <p><label for="arrival-station-name-input">도착역</label><input type="text" id="arrival-station-name-input" /></p>\n'
      + '        <p>\n'
      + '            <input type="radio" name="search-type" value="최단거리" checked/><label>최단거리</label>\n'
      + '            <input type="radio" name="search-type" value="최소시간"/><label>최소시간</label>\n'
      + '        </p>\n'
      + '        <p><input type="button" value="길 찾기" id="search-button" /></p>\n'
      + '    </form>\n'
      + '    <div id="result"></div>';
  }

  isValidInput(departure, arrival) {
    if (departure.length < 2 || arrival.length < 2) {
      return false;
    }
    if (!this.STATIONS.includes(departure) || !this.STATIONS.includes(arrival)) {
      return false;
    }
    return departure !== arrival;
  }

  setUserInput(departure, arrival) {
    this.departure = departure;
    this.arrival = arrival;
    this.$searchType.forEach((node) => {
      if (node.checked) {
        this.checked = node.value;
      }
    });
  }

  calculateResult() {
    const dijkstra = new Dijkstra();
    this.LINES.forEach((elem) => {
      for (let i = 0; i < elem.stations.length - 1; i += 1) {
        if (this.checked === '최단거리') {
          dijkstra.addEdge(elem.stations[i], elem.stations[i + 1], elem.distanceInterval[i]);
        } else {
          dijkstra.addEdge(elem.stations[i], elem.stations[i + 1], elem.timeInterval[i]);
        }
      }
    });
    return dijkstra.findShortestPath(this.departure, this.arrival);
  }

  renderResult(result) {
    this.$result.innerHTML = `        <h2>📝 결과</h2>        <h3>${this.checked}</h3>\n`;
    let totalPath = 0;
    let totalTime = 0;
    for (let i = 0; i < result.length - 1; i += 1) {
      for (let j = 0; j < this.LINES.length; j += 1) {
        const elem = this.LINES[j];
        if (elem.stations.includes(result[i]) && elem.stations.includes(result[i + 1])) {
          const found = elem.stations.indexOf(result[i]) > elem.stations.indexOf(result[i + 1])
            ? elem.stations.indexOf(result[i + 1]) : elem.stations.indexOf(result[i]);
          totalPath += elem.distanceInterval[found];
          totalTime += elem.timeInterval[found];
        }
      }
    }
    this.renderResultTable(totalPath, totalTime, result.join('➡'));
  }

  renderResultTable(totalPath, totalTime, result) {
    this.$result.innerHTML += '        <table>\n'
      + '            <thead>\n'
      + '            <tr>\n'
      + '                <td>총 거리</td>\n'
      + '                <td>총 소요시간</td>\n'
      + '            </tr>\n'
      + '            </thead>\n'
      + '            <tbody>\n'
      + '            <tr>\n'
      + `                <td>${totalPath}km</td>\n`
      + `                <td>${totalTime}분</td>\n`
      + '            </tr>\n'
      + '            <tr>\n'
      + `                <td colspan="2">${result}</td>\n`
      + '            </tr>\n'
      + '            </tbody>\n'
      + '        </table>';
  }

  addEventListener() {
    this.$searchButton.addEventListener('click', () => {
      const departure = this.$departureStationNameInput.value;
      const arrival = this.$arrivalStationNameInput.value;
      if (this.isValidInput(departure, arrival)) {
        this.setUserInput(departure, arrival);
        const result = this.calculateResult();
        if (result.length) {
          this.renderResult(result);
        } else {
          // eslint-disable-next-line no-alert
          alert('경로를 찾을 수 없다');
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('제대로 입력하라');
      }
    });
  }
}
