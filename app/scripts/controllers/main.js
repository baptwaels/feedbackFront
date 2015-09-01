(function () {
  'use strict';

  angular
    .module('feedbackFrontApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'DataService', 'StatisticsService'];

  function MainCtrl($scope, DataService, StatisticsService) { // jshint ignore:line
    $scope.teams = DataService.getTeams();
    $scope.activeTeam = '';
    $scope.currentApp = '';
    $scope.currentHappyVotes = [];
    $scope.currentUnhappyVotes = [];
    $scope.apps = [];
    $scope.votesStats = undefined;

    $scope.teamSelected = teamSelected;
    $scope.modifyCurrentApp = modifyCurrentApp;

    function teamSelected(name) { // jshint ignore:line
      $scope.activeTeam = name;
      $scope.apps = DataService.getCurrentAppsFromTeamName($scope.activeTeam);
      $scope.currentApp = $scope.apps[0].appName;
      $scope.currentHappyVotes = DataService.getCurrentVotesFromAppNameAndTeamAndType($scope.activeTeam, $scope.currentApp, 'happy');
      $scope.currentUnhappyVotes = DataService.getCurrentVotesFromAppNameAndTeamAndType($scope.activeTeam, $scope.currentApp, 'unhappy');
      $scope.votesStats = StatisticsService.getAllStatsFromYear('2015');
      console.log($scope.votesStats);
    }

    function modifyCurrentApp(appName) { // jshint ignore:line
      $scope.currentApp = appName;
      $scope.currentVotes = DataService.getCurrentVotesFromAppNameAndTeamAndType($scope.activeTeam, $scope.currentApp, 'happy');
      $scope.currentUnhappyVotes = DataService.getCurrentVotesFromAppNameAndTeamAndType($scope.activeTeam, $scope.currentApp, 'unhappy');
    }
  }
})();
