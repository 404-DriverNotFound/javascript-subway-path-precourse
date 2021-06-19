/* eslint-disable no-alert */
/* eslint-disable import/extensions */
import {
  DEPARTURE_STATION_INPUT,
  ARRIVAL_STATION_INPUT,
  MIN_DISTANCE_INPUT,
  RESULT_DIV,
  DISTANCE_TD,
  TIME_TD,
  PATH_TD,
  stations,
  costs,
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

function calcCost(path) {
  return path.reduce((acc, cur, idx, arr) => {
    if (idx < arr.length - 1) {
      const { time, distance } = costs.find((info) => info.stations.includes(cur)
                              && info.stations.includes(arr[idx + 1]));
      acc.time += time;
      acc.distance += distance;
    }
    return acc;
  }, { distance: 0, time: 0 });
}

function renewTable(graph) {
  const $distanceTd = document.getElementById(DISTANCE_TD);
  const $timeTd = document.getElementById(TIME_TD);
  const $pathTd = document.getElementById(PATH_TD);
  const departure = document.getElementById(DEPARTURE_STATION_INPUT).value;
  const arrival = document.getElementById(ARRIVAL_STATION_INPUT).value;

  const path = graph.findShortestPath(departure, arrival);
  const { distance, time } = calcCost(path);
  $distanceTd.innerText = distance;
  $timeTd.innerText = time;
  $pathTd.innerText = path.join('→');
}

export default function handleClickEvent(distGraph, timeGraph) {
  const isMinDist = document.getElementById(MIN_DISTANCE_INPUT).checked;
  const graph = isMinDist ? distGraph : timeGraph;
  const $app = document.getElementById('app');

  if (!isValidInput(graph)) {
    $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'hidden';
    return;
  }
  $app.querySelector('h3').innerText = isMinDist ? '최단거리' : '최소시간';
  renewTable(graph);
  $app.querySelector(`#${RESULT_DIV}`).style.visibility = 'visible';
}
