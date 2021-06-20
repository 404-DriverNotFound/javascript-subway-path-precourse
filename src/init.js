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
} from './constant.js';
import handleClickEvent from './handleEvent.js';

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

function makeTableRow(tag, property = null, contents = null) {
  const arr = [];
  const length = Math.max((property && property.length), (contents && contents.length));
  for (let i = 0; i < length; i += 1) {
    arr.push(`<${tag} ${(property && property[i]) || ''}>${(contents && contents[i]) || ''}</${tag}>`);
  }
  return `
  <tr>
    ${arr.join('\n')}
  </tr> 
  `;
}

function makeResultDiv() {
  const $app = document.getElementById('app');
  $app.insertAdjacentHTML('beforeend', `
  <div id="${RESULT_DIV}">
    <h2>📝 결과</h2>
    <h3></h3>
    <table>
      <thead>
        ${makeTableRow('th', null, ['총 거리', '총 소요 시간'])}
      </thead>
      <tbody>
        ${makeTableRow('td', [`id="${DISTANCE_TD}"`, `id="${TIME_TD}"`])}
        ${makeTableRow('td', [`id="${PATH_TD}" colspan="2"`])}
      </tbody>
    </table>
  </div>`);
}

export default function initPage(distGraph, timeGraph) {
  makeHeader();
  makeResultDiv();

  const $app = document.getElementById('app');
  $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'hidden';

  const $button = document.getElementById(SEARCH_BUTTON);
  $button.addEventListener('click', () => handleClickEvent(distGraph, timeGraph));
}
