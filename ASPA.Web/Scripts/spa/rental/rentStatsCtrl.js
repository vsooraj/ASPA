﻿(function (app) {
    'use strict';
    app.controller('rentStatsCtrl', rentStatsCtrl);
    rentStatsCtrl.$inject = ['$scope', 'apiService', 'notificationService',
   '$timeout'];
    function rentStatsCtrl($scope, apiService, notificationService, $timeout) {
        $scope.loadStatistics = loadStatistics;
        $scope.rentals = [];
        function loadStatistics() {
            $scope.loadingStatistics = true;
            apiService.get('/api/rentals/rentalhistory', null,
            rentalHistoryLoadCompleted,
            rentalHistoryLoadFailed);
        }

        function loadMockStatistics() {
            $scope.loadingStatistics = true;
            apiService.get('Scripts/spa/rental/rentalMock.json', null,
                rentalHistoryLoadCompleted,
                rentalHistoryLoadFailed
                );
        }
        function rentalHistoryLoadCompleted(result) {
            $scope.rentals = result.data;
            $timeout(function () {
                angular.forEach($scope.rentals, function (rental) {
                    if (rental.TotalRentals > 0) {
                        var movieRentals = rental.Rentals;
                        Morris.Line({
                            element: 'statistics-' + rental.ID,
                            data: movieRentals,
                            parseTime: false,
                            lineWidth: 4,
                            xkey: 'Date',
                            xlabels: 'day',
                            resize: 'true',
                            ykeys: ['TotalRentals'],
                            labels: ['Total Rentals']
                        });
                    }
                })
            }, 1000);
            $scope.loadingStatistics = false;
        }
        function rentalHistoryLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        //loadStatistics();

        loadMockStatistics();
    }
})(angular.module('homeCinema'));