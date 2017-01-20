(function (app) {
    'use strict';

    app.controller('moviesCtrl', moviesCtrl);

    moviesCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function moviesCtrl($scope, apiService, notificationService) {
        $scope.pageClass = 'page-movies';
        $scope.loadingMovies = true;
        $scope.page = 0;
        $scope.pagesCount = 1;

        $scope.Movies = [];

        $scope.search = search;
        $scope.clearSearch = clearSearch;

        function search(page) {
            page = page || 0;

            $scope.loadingMovies = true;

            var config = [
                {

                    page: page,
                    pageSize: 6,
                    filter: $scope.filterMovies
                }];
            

            //apiService.get('/api/movies/', config,
            //moviesLoadCompleted,
            //moviesLoadFailed);

            apiService.get('Scripts/spa/movies/moviesMock.json', config,
            moviesLoadCompleted,
            moviesLoadFailed);
        }

        function moviesLoadCompleted(result) {
            $scope.Movies = result.data[0].Items;
            $scope.page = result.data[0].Page;
            $scope.pagesCount = result.data[0].TotalPages;
            $scope.totalCount = result.data[0].TotalCount;
            $scope.loadingMovies = false;

            //if ($scope.filterMovies && $scope.filterMovies.length) {
            //    notificationService.displayInfo(result.data.Items.length + ' movies found');
            //}

        }

        function moviesLoadFailed(response) {
            notificationService.displayError(response.data);
        }

        function clearSearch() {
            $scope.filterMovies = '';
            search();
        }

        $scope.search();
    }

})(angular.module('homeCinema'));