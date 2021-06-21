import {
  station,
  distanceGraph,
  timeGraph,
  lines,
} from './data.js';
import { getRadiochecked, renderResult } from './dom.js';

export function checkInputVaild(dom) {
  const { departureStationInput, arrivalStationInput } = dom;
  const departure = departureStationInput.value;
  const arrival = arrivalStationInput.value;
  if (departure === arrival || departure.length < 2 || arrival.length < 2) {
    return false;
  }
  return (station.has(departure) && station.has(arrival));
}

export function checkShortestPath(dom) {
  const { departureStationInput, arrivalStationInput } = dom;
  let path;
  if (getRadiochecked() === 'distance') {
    path = distanceGraph.findShortestPath(departureStationInput.value, arrivalStationInput.value);
  } else {
    path = timeGraph.findShortestPath(departureStationInput.value, arrivalStationInput.value);
  }
  if (!path) {
    return false;
  }
  renderResult(path);
  return true;
}

function getStationIndex(name) {
  const result = [];
  lines.forEach((line, lineIndex) => {
    const stationIndex = line.stations.map((value) => value.name).indexOf(name);
    if (stationIndex !== -1) {
      result.push({ lineIndex, stationIndex });
    }
  });
  return result;
}

function getPathData(currIndex, nextName) {
  let result;
  currIndex.forEach((val) => {
    const { lineIndex, stationIndex } = val;
    const { stations } = lines[lineIndex];
    if (stations[stationIndex].prev && nextName === stations[stationIndex - 1].name) {
      result = stations[stationIndex].prev;
    }
    if (stations[stationIndex].next && nextName === stations[stationIndex + 1].name) {
      result = stations[stationIndex].next;
    }
  });
  return result;
}

export function calculateResult(path) {
  let sumDistance = 0;
  let sumTime = 0;

  for (let i = 0; i < path.length - 1; i += 1) {
    const currIndex = getStationIndex(path[i]);
    const { distance, time } = getPathData(currIndex, path[i + 1]);
    sumDistance += distance;
    sumTime += time;
  }
  return { sumDistance, sumTime };
}
