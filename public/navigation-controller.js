import { uiModules } from 'ui/modules';
import 'ui/autoload/all';

uiModules.get('kibana').controller('KbnNavigationVisController', function ($scope, es) {
  const _es = es;
  const defaultSize = 15;
  let sortFlag = -1;
  $scope.dashboards = null;
  const search = function () {
    if(!$scope.vis.params.filter) {
      $scope.vis.params.filter = '';
    }
    let size = Number($scope.vis.params.size);
    if (isNaN(size) || size === 0) {
      size = defaultSize;
    }
    _es.search({
      index: '.kibana',
      body: {
        size: size,
        query: {
          prefix: {
            'dashboard.title': {
              value: $scope.vis.params.filter
            }
          }
        }
      }
    }, function (error, result) {
      if(error) {
        console.log(error);
        return;
      }
      $scope.dashboards = result.hits.hits;
      $scope.sanitizer($scope.dashboards, true);
    });
  };
  const sortByTitle = function (first, second) {
    const firstT = first._source ? first._source.dashboard.title : first.title;
    const secondT = second._source ? second._source.dashboard.title : second.title;
    if(firstT < secondT) return sortFlag;
    if(firstT > secondT) return -sortFlag;
    return 0;
  };
  const sortList = function (list) {
    if($scope.vis.params.order === 'ASC') {
      sortFlag = -1;
    } else {
      sortFlag = 1;
    }
    list.sort(sortByTitle);
  };
  $scope.sanitizer = function (list, sort) {
    if(list) {
      $scope.listItems = [];
      let dashboardName = 'title';
      if($scope.vis.params.useDescription) {
        dashboardName = 'description';
      }
      let fetchName;
      if($scope.vis.params.truncateName && $scope.vis.params.delimiter) {
        fetchName = function (element) {
          return element._source.dashboard[dashboardName]
            .substring(element._source.dashboard[dashboardName].indexOf($scope.vis.params.delimiter) + 1);
        };
      } else {
        fetchName = function (element) {
          return element._source.dashboard[dashboardName];
        };
      }
      if (sort) {
        sortList(list);
      }
      list.forEach(function (element, index) {
        const temp = {};
        temp.title = element._source.dashboard.title;
        temp.name = fetchName(element);
        temp.id = element._id.split(':')[1];
        $scope.listItems[index] = temp;
      });
    }
  };

  $scope.getLinkStyle = function (id) {
    if(window.location.href.includes(id)) {
      return 'font-weight: bold;';
    }
    return '';
  };

  search();

  if(window.location.href.includes('kibana#/visualize/')) {
    $scope.$watch('vis.params.truncateName', function () {
      $scope.sanitizer($scope.dashboards, false);
    });
    $scope.$watch('vis.params.delimiter', function () {
      $scope.sanitizer($scope.dashboards, false);
    });
    $scope.$watch('vis.params.useDescription', function () {
      $scope.sanitizer($scope.dashboards, false);
    });
    $scope.$watch('vis.params.order', function () {
      sortList($scope.listItems);
    });
    $scope.$watch('vis.params.filter', function () {
      search();
    });
    $scope.$watch('vis.params.size', function () {
      const size = Number($scope.vis.params.size);
      if(!isNaN(size) && size !== 0) {
        search();
      }
    });
  }
});
