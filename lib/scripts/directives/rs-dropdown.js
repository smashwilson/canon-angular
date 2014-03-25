'use strict';

angular.module('ui.canon.dropdown', [])
  .directive('rsDropdown', function() {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element) {
        var isVisible = false, trigger, candidates, menu, i, e;

        element.addClass('rs-dropdown');

        // Find the trigger element. This is a direct child of the
        // .rs-dropdown element that's a button or a link with the
        // .rs-dropdown-toggle class.
        trigger = null;

        candidates = element.children();
        for(i = 0; i < candidates.length; i++) {
          e = angular.element(candidates[i]);
          if (e.hasClass('rs-dropdown-toggle')) {
            trigger = e;
          }
        }

        menu = element.find('ul');

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
        };

        if (typeof trigger === 'object') {
          trigger.bind('click', scope.toggleDropdown);
        } else {
          console.log('No .rs-dropdown-toggle within rs-dropdown!');
        }
      }
    };
});
