/* eslint-disable import/extensions */
import {
  DEPARTURE_STATION_INPUT,
  ARRIVAL_STATION_INPUT,
  MIN_DISTANCE_INPUT,
  MIN_TIME_INPUT,
  SEARCH_TYPE,
  SEARCH_BUTTON,
} from './constant.js';

export function initPage() {
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

export function initData() {
  // TODO: initData
}
