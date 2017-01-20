﻿(function (app) {
	'use strict';

	app.directive('topBar', topBar);

	function topBar() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: '~/Scripts/spa/layout/topBar/topBar.html'
		}
	}

})(angular.module('common.ui'));
