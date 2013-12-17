'use strict';

describe('rs-button', function() {
  var element, $scope, $directiveScope;

  beforeEach(module('ui.canon.button'));
   // Load the templates.
  beforeEach(module('/views/directives/rs-button.html'));

  beforeEach(inject(function(_$rootScope_, $compile) {
    $scope = _$rootScope_.$new();
    $scope.onBtnClick = jasmine.createSpy();
    element = angular.element(
      '<rs-button btn-text="foo" btn-click-handler="onBtnClick()" ></rs-button>'
    );
    $compile(element)($scope);
    $scope.$digest();
    $directiveScope = element.scope().$$childHead;
  }));

  it('loads the template', function() {
    expect(element).toBeDefined();
  });

  it('adds canon class to the element', function() {
    expect(element.hasClass('rs-btn')).toBe(true);
  });

  it('sets text for the button', function() {
    expect(element.text()).toEqual('foo');
  });

  it('calls the btn handler on click', function() {
    $directiveScope.onClick();
    expect($scope.onBtnClick).toHaveBeenCalled();
  });

});
