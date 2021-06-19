/* eslint-disable import/extensions */
import {
  DEPARTURE_STATION_INPUT,
  ARRIVAL_STATION_INPUT,
  MIN_DISTANCE_INPUT,
  MIN_TIME_INPUT,
  SEARCH_TYPE,
  SEARCH_BUTTON,
  RESULT_DIV,
  DISTANCE_TD,
  TIME_TD,
  PATH_TD,
  costs,
} from './constant.js';
import handleClickEvent from './handleEvent.js';
import Dijkstra from './utils/Dijkstra.js';

function makeHeader() {
  const $app = document.getElementById('app');
  $app.insertAdjacentHTML('beforeend', `
  <header>
    <h1>🚇 지하철 길찾기</h1>
    <p>출발역 <input id="${DEPARTURE_STATION_INPUT}"></p>
    <p>도착역 <input id="${ARRIVAL_STATION_INPUT}"></p>
    <p>
      <input type="radio" id="${MIN_DISTANCE_INPUT}" name="${SEARCH_TYPE}" checked>
      <label for="${MIN_DISTANCE_INPUT}">최단거리</label>
      <input type="radio" id="${MIN_TIME_INPUT}" name="${SEARCH_TYPE}">
      <label for="${MIN_TIME_INPUT}">최소시간</label>
    </p>
    <button id="${SEARCH_BUTTON}">길 찾기</button>
  </header>`);
}

function makeResultDiv() {
  const $app = document.getElementById('app');
  $app.insertAdjacentHTML('beforeend', `
  <div id="${RESULT_DIV}">
    <h2>📝 결과</h2>
    <h3></h3>
    <table>
      <thead>
        <tr>
          <th>총 거리</th>
          <th>총 소요 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="${DISTANCE_TD}"></td>
          <td id="${TIME_TD}"></td>
        </tr>
        <tr>
          <td id="${PATH_TD}" colspan="2"></td>
        </tr>
      </tbody>
    </table>
  </div>
  `);
}

export function initPage(distGraph, timeGraph) {
  makeHeader();
  makeResultDiv();

  const $app = document.getElementById('app');
  $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'hidden';

  const $button = document.getElementById(SEARCH_BUTTON);
  $button.addEventListener('click', () => handleClickEvent(distGraph, timeGraph));
}

export function initGraph() {
  const distGraph = new Dijkstra();
  const timeGraph = new Dijkstra();
  costs.forEach((cost) => {
    distGraph.addEdge(cost.stations[0], cost.stations[1], cost.distance);
    timeGraph.addEdge(cost.stations[0], cost.stations[1], cost.time);
  });
  return [distGraph, timeGraph];
}
