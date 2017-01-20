(function (app) {
    'use strict';

    app.controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function indexCtrl($scope, apiService, notificationService) {
        $scope.pageClass = 'page-home';
        $scope.loadingMovies = true;
        $scope.loadingGenres = true;
        $scope.isReadOnly = true;
        $scope.latestMovies = [];
        //$scope.loadData = loadData;      
        $scope.loadData = loadDataMock;

        function loadData() {
            apiService.get('/api/movies/latest', null,
                        moviesLoadCompleted,
                        moviesLoadFailed);

            apiService.get("/api/genres/", null,
                genresLoadCompleted,
                genresLoadFailed);
        }

        function moviesLoadCompleted(result) {
            $scope.latestMovies = result.data;
            $scope.loadingMovies = false;
        }

        function genresLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function moviesLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function genresLoadCompleted(result) {
            var genres = result.data;
            Morris.Bar({
                element: "genres-bar",
                data: genres,
                xkey: "Name",
                ykeys: ["NumberOfMovies"],
                labels: ["Number Of Movies"],
                barRatio: 0.4,
                xLabelAngle: 55,
                hideHover: "auto",
                resize: 'true'
            });

            $scope.loadingGenres = false;
        }

        function loadDataMock() {
            apiService.get("Scripts/spa/movies/moviesMock.json", null,
                moviesLoadCompletedMock,
                moviesLoadFailed);

            apiService.get("Scripts/spa/home/genresMock.json", null,
                genresLoadCompletedMock,
                genresLoadFailed);          
        }

        function moviesLoadCompletedMock(result) {
            $scope.latestMovies = result.data[0].Items;
            $scope.loadingMovies = false;
        }

        function genresLoadCompletedMock(result) {
            var genres = result.data;
            console.log(genres);
            Morris.Bar({
                element: "genres-bar",
                data: genres,
                xkey: "Name",
                ykeys: ["NumberOfMovies"],
                labels: ["Number Of Movies"],
                barRatio: 0.4,
                xLabelAngle: 55,
                hideHover: "auto",
                resize: 'true'
            });

            $scope.loadingGenres = false;
        }

        //loadData();
        loadDataMock();

    }

})(angular.module('homeCinema'));