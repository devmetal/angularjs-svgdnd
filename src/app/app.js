import angular from 'angular';
import dragula from 'angular-dragula';
import bubble from './bubble';
import line from './line';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/';
    this.lineData = [4, 8, 15, 16, 23, 42];
    this.bubbleData = [];
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .directive('bubble', bubble)
  .directive('line', line)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
