'use strict';

angular.module('ui.canon.dropdown', [])
  .directive('rsDropdown', function($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element) {
        var isVisible = false;
        var button = element.find('button');
        var menu = element.find('ul');

        element.addClass('rs-dropdown');

        function showDropdown() {
          menu.addClass('visible').removeClass('hidden');
        }

        function hideDropdown() {
          menu.addClass('hidden').removeClass('visible');
        }

        scope.toggleDropdown = function() {
          if (isVisible) {
            hideDropdown();
            isVisible = false;
          } else {
            showDropdown();
            isVisible = true;
          }
        }

        button.bind('click', scope.toggleDropdown);
      }
    }
});
