(function () {
    'use strict';

    angular.module('homeCinema', ['common.core', 'common.ui'])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "Scripts/spa/home/index.html",
                controller: "indexCtrl"
            })
            .when("/login", {
                templateUrl: "Scripts/spa/account/login.html",
                controller: "loginCtrl"
            })
            .when("/register", {
                templateUrl: "Scripts/spa/account/register.html",
                controller: "registerCtrl"
            })
            .when("/customers", {
                templateUrl: "Scripts/spa/customers/customers.html",
                controller: "customersCtrl"
            })
            .when("/customers/register", {
                templateUrl: "Scripts/spa/customers/register.html",
                controller: "customersRegCtrl"
            })
            .when("/movies", {
                templateUrl: "Scripts/spa/movies/movies.html",
                controller: "moviesCtrl"
            })
            .when("/movies/add", {
                templateUrl: "Scripts/spa/movies/add.html",
                controller: "movieAddCtrl"
            })
            .when("/movies/:id", {
                templateUrl: "Scripts/spa/movies/details.html",
                controller: "movieDetailsCtrl"
            })
            .when("/movies/edit/:id", {
                templateUrl: "Scripts/spa/movies/edit.html",
                controller: "movieEditCtrl"
            })
            .when("/rental", {
                templateUrl: "Scripts/spa/rental/rental.html",
                controller: "rentStatsCtrl"
            }).otherwise({ redirectTo: "/" });
    }

})();