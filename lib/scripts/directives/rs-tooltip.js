'use strict';

angular.module('ui.canon.tooltip', [])
  .directive('rsTooltip', function($document) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element) {
        var position,
          tooltip,
          content,
          title,
          boundingRect,
          body;

        scope.showTooltip = function() {
          title = element.attr('title');
          boundingRect = element[0].getBoundingClientRect();
          body = angular.element($document[0].body);
          element.removeAttr('title');
          position = { top: '', left: '' };
          position.top = Math.round(
            boundingRect.top + boundingRect.height) + 'px';
          position.left = Math.round(boundingRect.left + 10) + 'px';

          content = angular.element('<div class="rs-tooltip-inner"></div>');
          content.html(title);

          tooltip = angular.element('<div class="rs-tooltip"></div>');
          tooltip.addClass('visible');
          tooltip.attr('id', 'current-tip');
          tooltip.css({ 'top': position.top, 'left': position.left });
          tooltip.append(content);

          body.append(tooltip);
        };

        scope.hideTooltip = function() {
          element.attr('title', title);
          tooltip.remove();
        };

        element.bind('mouseenter', scope.showTooltip);
        element.bind('mouseleave', scope.hideTooltip);
      }
    };
});
