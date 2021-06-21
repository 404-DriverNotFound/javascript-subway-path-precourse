import { initDOM } from './utils/dom.js';
import { checkInputVaild, checkShortestPath } from './utils/play.js';

function SubwayPath() {
  const dom = initDOM();

  function onFindLocationClicked() {
    if (!checkInputVaild(dom) || !checkShortestPath(dom)) {
      alert('🚨 입력이 잘못되었거나 경로를 찾을 수 없습니다 🚨');
      return;
    }
    dom.resultContainer.style.visibility = 'visible';
  }

  dom.resultContainer.style.visibility = 'hidden';
  dom.findLocationButton.addEventListener('click', onFindLocationClicked);
}

new SubwayPath();
