/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import {
  DEPARTURE_STATION_INPUT,
  ARRIVAL_STATION_INPUT,
  MIN_DISTANCE_INPUT,
  RESULT_DIV,
  stations,
} from './constant.js';

function isValidInput(graph) {
  const departure = document.getElementById(DEPARTURE_STATION_INPUT).value;
  const arrival = document.getElementById(ARRIVAL_STATION_INPUT).value;

  if (departure.length < 2 || arrival.length < 2 || departure === arrival) {
    alert('2글자 이상의 서로 다른 역 이름을 입력해 주세요.');
    return false;
  } if (!stations.includes(departure) || !stations.includes(arrival)) {
    alert('등록되어있는 역 이름을 입력해주세요.');
    return false;
  } if (!graph.findShortestPath(departure, arrival)) {
    alert('입력하신 두 역은 연결되어있지 않습니다.');
    return false;
  }
  return true;
}

export default function handleClickEvent(distGraph, timeGraph) {
  const isMinDist = document.getElementById(MIN_DISTANCE_INPUT).checked;
  const graph = isMinDist ? distGraph : timeGraph;
  const $app = document.getElementById('app');

  if (!isValidInput(graph)) {
    $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'hidden';
    return;
  }
  // TODO: makeResult
  $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'visible';
}
