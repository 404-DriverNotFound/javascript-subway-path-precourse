/* eslint-disable import/extensions */
/* eslint-disable no-new */
import initPage from './init.js';
import { costs } from './constant.js';
import Dijkstra from './utils/Dijkstra.js';

export default function App() {
  this.initGraph = () => {
    this.distGraph = new Dijkstra();
    this.timeGraph = new Dijkstra();
    costs.forEach((cost) => {
      this.distGraph.addEdge(cost.stations[0], cost.stations[1], cost.distance);
      this.timeGraph.addEdge(cost.stations[0], cost.stations[1], cost.time);
    });
  };

  this.initGraph();
  initPage(this.distGraph, this.timeGraph);
}

new App();
