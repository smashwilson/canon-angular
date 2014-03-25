'use strict';

angular.module('ui.canon.dropdown', [])
  .directive('rsDropdown', function($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element) {
        var isVisible,
          candidates, body,
          trigger, menu,
          position, width,
          i, e;

        isVisible = false;
        element.addClass('rs-dropdown');

        position = element[0].getBoundingClientRect();

        candidates = element.children();
        for(i = 0; i < candidates.length; i++) {
          e = angular.element(candidates[i]);
          if (e.hasClass('rs-dropdown-toggle')) {
            trigger = e;
          }
          if (e.hasClass('rs-dropdown-menu')) {
            menu = e;
          }
        }

        if (typeof trigger !== 'object') {
          throw("Missing required .rs-dropdown-toggle element!");
        }
        if (typeof menu !== 'object') {
          throw("Missing required .rs-dropdown-menu element!");
        }

        // Detach the menu and re-attach it to the document body.
        width = menu.css('width');
        console.log(width);
        body = angular.element($document[0].body);
        menu.remove();
        body.append(menu);
        menu.css({
          'top': position.bottom,
          'left': position.left,
          'width': width,
          'min-width': 0
        });

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

        trigger.bind('click', scope.toggleDropdown);
      }
    };
});
