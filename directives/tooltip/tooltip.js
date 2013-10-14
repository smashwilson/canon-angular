"use strict";

angular.module('ui.canon.tooltip', []);

angular.module('ui.canon.tooltip')
  .directive('tooltip', [function() {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs, ctrl) {
        // var tooltip;
        // tooltip = new canon.Tooltip();
        // tooltip.attach(element);

        var position,
          tooltip,
          content,
          title;

        var showTooltip,
          hideTooltip,
          toggleTooltip;

        // $(element).hover(function() {
        //   showTooltip();
        // },function() {
        //   hideTooltip();
        // });

        $(element).on('click', toggleTooltip);

        showTooltip = function() {
          title = $(element).attr("title");
          $(element).removeAttr('title');

          position = { top: '', left: '' };
          position.top = Math.round($(element).offset().top+$(element).height()+5) + 'px';
          position.left = Math.round($(element).offset().left+10) + 'px';

          content = $('<div class="rs-tooltip-inner"></div>');
          content.html(title);

          tooltip = $('<div class="rs-tooltip"></div>');
          tooltip.addClass('visible');
          tooltip.attr('id', 'current-tip');
          tooltip.css({ 'top': position.top, 'left': position.left });
          tooltip.append(content);
          tooltip.appendTo('body');
        };

        hideTooltip = function() {
          $(element).attr('title', title)
          tooltip.remove();
        };

        toggleTooltip = function() {
          console.log('click!');
          if(tooltip.hasClass('visible')){
            console.log('ye!');
            return hideTooltip();
          } else {
            console.log('ne!');
            return showTooltip();
          }
        };
      }
    };
}]);