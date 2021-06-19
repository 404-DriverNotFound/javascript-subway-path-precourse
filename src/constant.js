export const DEPARTURE_STATION_INPUT = 'departure-station-name-input';
export const ARRIVAL_STATION_INPUT = 'arrival-station-name-input';
export const MIN_DISTANCE_INPUT = 'min-distance-input';
export const MIN_TIME_INPUT = 'min-time-input';
export const SEARCH_TYPE = 'search-type';
export const SEARCH_BUTTON = 'search-button';
export const RESULT_DIV = 'result-container';
export const DISTANCE_TD = 'distance-td';
export const TIME_TD = 'time-td';
export const PATH_TD = 'path-td';

export const stations = [
  '교대',
  '강남',
  '역삼',
  '남부터미널',
  '양재',
  '양재시민의숲',
  '매봉',
];

export const lines = [
  {
    name: '2호선',
    stations: [
      '교대',
      '강남',
      '역삼',
    ],
  },
  {
    name: '3호선',
    stations: [
      '교대',
      '남부터미널',
      '양재',
      '매봉',
    ],
  },
  {
    name: '신분당선',
    stations: [
      '강남',
      '양재',
      '양재시민의숲',
    ],
  },
];

export const costs = [
  {
    stations: ['교대', '강남'],
    distance: 2,
    time: 3,
  },
  {
    stations: ['강남', '역삼'],
    distance: 2,
    time: 3,
  },
  {
    stations: ['교대', '남부터미널'],
    distance: 3,
    time: 2,
  },
  {
    stations: ['남부터미널', '양재'],
    distance: 6,
    time: 5,
  },
  {
    stations: ['양재', '매봉'],
    distance: 1,
    time: 1,
  },
  {
    stations: ['강남', '양재'],
    distance: 2,
    time: 8,
  },
  {
    stations: ['양재', '양재시민의숲'],
    distance: 10,
    time: 3,
  },
];
