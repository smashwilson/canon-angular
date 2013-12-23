'use strict';

angular.module('ui.canon.list', [])
  .directive('rsList', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        listItems: '='
      },
      templateUrl: '/views/directives/rs-list.html',
      link: function() {
      }
    };
});
