import { calculateResult } from './play.js';

export function initDOM() {
  const findLocationButton = document.getElementById('find-location');
  const departureStationInput = document.getElementById('departure-station');
  const arrivalStationInput = document.getElementById('arrival-station');
  const resultContainer = document.getElementById('result-container');

  return {
    findLocationButton,
    departureStationInput,
    arrivalStationInput,
    resultContainer,
  };
}

export function getRadiochecked() {
  const searchByRadios = document.getElementsByName('search-by');

  for (let i = 0; i < searchByRadios.length; i += 1) {
    if (searchByRadios[i].checked) {
      return searchByRadios[i].value;
    }
  }
  return undefined;
}

export function renderResult(path) {
  const distanceResult = document.getElementById('distance-result');
  const timeResult = document.getElementById('time-result');
  const routeResult = document.getElementById('route-result');

  const { sumDistance, sumTime } = calculateResult(path);
  distanceResult.innerHTML = `${sumDistance}km`;
  timeResult.innerHTML = `${sumTime}분`;
  routeResult.innerHTML = path.join('➡');
}
