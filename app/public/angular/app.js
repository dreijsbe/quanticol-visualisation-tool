/**
 * Created by ManasB on 6/6/2015.
 */

/**
 * Main app module initialization
 */

var app = angular.module("bus-simulator", ["ui.router"]);

/**
 * Routes configuration
 */

app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("tool", {
            url: "/tool",
            templateUrl: "/angular/views/tool.html"
        });

        $stateProvider.state("documentation", {
            url: "/documentation",
            templateUrl: "/angular/views/about.html"
        });

        // redirect to tool state for undefined routes
        $urlRouterProvider.otherwise("tool");
    }
]);


/**
 * Controllers
 */

app.controller("NavigationController", [
    "$scope",
    function ($scope) {
        $scope.tabs = [
            {name: "Tool", active: true, state: "tool", iconClass: "glyphicon-wrench"},
            {name: "Docmentation", active: false, state: "documentation", iconClass: "glyphicon-question-sign"}
        ];

        $scope.selectTab = function (selectedTab) {
            for (var i=0; i<$scope.tabs.length; i++) {
                if (!$scope.tabs[i] != selectedTab) {
                    $scope.tabs[i].active = false;
                }
            }
            selectedTab.active = true;
        };

        $scope.$on("$locationChangeSuccess", function (event, newState) {
            newState = newState.substring(newState.indexOf("#/")+2, newState.length);
            for (var i=0; i<$scope.tabs.length; i++) {
                if ($scope.tabs[i].state == newState) {
                    $scope.selectTab($scope.tabs[i]);
                }
            }
        });
    }
]);