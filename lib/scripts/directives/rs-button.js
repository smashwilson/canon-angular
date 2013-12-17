'use strict';

angular.module('ui.canon.button', [])
  .directive('rsButton', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        btnText: '@',
        state: '=',
        btnClickHandler: '&',
      },
      templateUrl: '/views/directives/rs-button.html',
      link: function(scope) {
        scope.onClick = function() {
          scope.state = 'disabled';
          scope.btnClickHandler();
        };
      }
    };
});
