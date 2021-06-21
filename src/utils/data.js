import Dijkstra from './Dijkstra.js';

export const lines = [
  {
    lineName: '2호선',
    stations: [
      {
        name: '교대',
        next: {
          distance: 2,
          time: 3,
        },
      },
      {
        name: '강남',
        prev: {
          distance: 2,
          time: 3,
        },
        next: {
          distance: 2,
          time: 3,
        },
      },
      {
        name: '역삼',
        prev: {
          distance: 2,
          time: 3,
        },
      },
    ],
  },
  {
    lineName: '3호선',
    stations: [
      {
        name: '교대',
        next: {
          distance: 3,
          time: 2,
        },
      },
      {
        name: '남부터미널',
        prev: {
          distance: 3,
          time: 2,
        },
        next: {
          distance: 6,
          time: 5,
        },
      },
      {
        name: '양재',
        prev: {
          distance: 6,
          time: 5,
        },
        next: {
          distance: 1,
          time: 1,
        },
      },
      {
        name: '매봉',
        prev: {
          distance: 1,
          time: 1,
        },
      },
    ],
  },
  {
    lineName: '신분당선',
    stations: [
      {
        name: '강남',
        next: {
          distance: 2,
          time: 8,
        },
      },
      {
        name: '양재',
        prev: {
          distance: 2,
          time: 8,
        },
        next: {
          distance: 10,
          time: 3,
        },
      },
      {
        name: '양재시민의숲',
        prev: {
          distance: 10,
          time: 3,
        },
      },
    ],
  },
];

export const station = (() => {
  const result = [];
  lines.forEach((line) => {
    line.stations.forEach((val) => result.push(val.name));
  });
  return new Set(result);
})();

export const distanceGraph = (() => {
  const result = new Dijkstra();
  lines.forEach((line) => {
    const { stations } = line;
    for (let i = 0; i < stations.length - 1; i += 1) {
      result.addEdge(stations[i].name, stations[i + 1].name, stations[i].next.distance);
    }
  });
  return result;
})();

export const timeGraph = (() => {
  const result = new Dijkstra();
  lines.forEach((line) => {
    const { stations } = line;
    for (let i = 0; i < stations.length - 1; i += 1) {
      result.addEdge(stations[i].name, stations[i + 1].name, stations[i].next.time);
    }
  });
  return result;
})();
