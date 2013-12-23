'use strict';

describe('rs-list', function() {
  var element, $scope, $location;

  beforeEach(module('ui.canon.list'));
   // Load the templates.
  beforeEach(module('/views/directives/rs-list.html'));

  beforeEach(inject(function(_$rootScope_, $compile, _$location_) {
    $scope = _$rootScope_.$new();
    $location = _$location_;
    $scope.items = [
      {
        label: 'foo',
        url: '/server/100'
      },
      {
        label: 'bar',
        url: '/server/200'
      }
    ];
    element = angular.element(
      '<rs-list list-items="items" header="header"></rs-list>'
    );
    $compile(element)($scope);
    $scope.$digest();
  }));

  it('loads the template', function() {
    expect(element).toBeDefined();
  });

  it('adds canon class to the list', function() {
    expect(element.hasClass('rs-list-table')).toBe(true);
  });

  it('adds a row with link per item', function() {
    expect($('.rs-table-link', element).length).toBe(2);
  });

  it('sets the text and url and on the link', function() {
    var link = $('.rs-table-link a', element)[0];
    expect(link.text).toEqual('foo');
  });

  it('sets the text and url and on the link', function() {
    var link = $('.rs-table-link a', element)[0];
    expect(link.href).toContain($scope.items[0].url);
  });

});
