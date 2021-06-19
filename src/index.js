/* eslint-disable import/extensions */
/* eslint-disable no-new */
import { initPage, initGraph } from './init.js';

export default function App() {
  [this.distGraph, this.timeGraph] = initGraph();

  initPage(this.distGraph, this.timeGraph);
}

new App();
