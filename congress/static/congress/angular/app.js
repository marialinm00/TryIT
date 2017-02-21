'use strict';

(function () {
	var app = angular.module('ngApp', []);

	app.controller('editionsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.sessionActive = {};

		// Petición AJAX
		$scope.openModal = function (id) {
			$http.get('/editions-api/sessions/' + id).success(function (data) {
				$scope.sessionActive = data;
				$('#modal').openModal();
				$location.url(id);
			});
		};

		var init = function () {
			if ($location.url()) {
				$scope.openModal($location.url().split('/')[1]);
			}
		};

		init();

	}]);

	app.controller('ticketValidationController', ['$scope', '$http', function ($scope, $http) {
		$scope.attendant = {student: true, upm_student: true, college: "10"};

		$scope.textError = 'Revisa los datos introducidos';
		$scope.formErrorSubmit = false;
		$scope.responseSuccess = false;
		$scope.btnSubmited = false;

		$http.get('/static/congress/angular/colleges.json')
			.then(function (res) {
				$scope.colleges = res.data;
				$scope.degrees = $scope.colleges[9].titulaciones;
				$scope.attendant.degree = $scope.degrees[10].nombre;
			});

		$scope.collegeSelected = function () {
			for (var i = 0; i < $scope.colleges.length; i++) {
				if ($scope.colleges[i].codigo === $scope.attendant.college) {
					$scope.degrees = $scope.colleges[i].titulaciones;
					$scope.attendant.degree = $scope.degrees[0].nombre;
					break;
				}
			}
		};

		$scope.createTicket = function () {
			if (!$scope.ticketForm.$valid) {
				$scope.formErrorSubmit = true;
				return
			}

			$scope.btnSubmited = true;
			$scope.formErrorSubmit = false;
			$http({
				method: 'POST',
				url: 'create/',
				data: $scope.attendant,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function successCallback(response) {
					$scope.responseSuccess = true;
				}, function errorCallback(response) {
					if (response.status == 400) {
						$scope.textError = response.data.message;
					}
					else {
						$scope.textError = 'Error';
					}
					$scope.formErrorSubmit = true;
					$scope.btnSubmited = false;
				}
			);
		};

		// DNI/NIE regex
		$scope.identityPattern = (function () {
			var regexp = /^[x-z]{1}[-]?\d{7}[-]?[a-z]{1}$|^\d{8}[-]?[a-z]{1}$/i;
			return {
				test: function (value) {
					if (!$scope.attendant.student || !$scope.attendant.upm_student) {
						return true;
					}
					return regexp.test(value);
				}
			}
		})();

	}]);

	app.controller('registerValidationController', ['$scope', '$http', function ($scope, $http) {
		$scope.registerCompany = {sponsor: false, sponsorType: 'oro', type: 'ponencia'};

		$scope.textError = 'Revisa los datos introducidos';
		$scope.formErrorSubmit = false;
		$scope.btnSubmited = false;

		$scope.submitForm = function () {
			if (!$scope.registerForm.$valid) {
				$scope.formErrorSubmit = true;
				return
			}

			$scope.btnSubmited = true;
			$scope.formErrorSubmit = false;

			var fd = new FormData();
			var doc = $("#document")[0].files[0];
			fd.append('document', doc);

			for (var key in $scope.registerCompany) {
				if ($scope.registerCompany.hasOwnProperty(key)) {
					fd.append(key, $scope.registerCompany[key]);
				}
			}

			$http({
				method: 'POST',
				url: 'send/',
				data: fd,
				headers: {'Content-Type': undefined}
			}).then(function successCallback(response) {
					$scope.responseSuccess = true;
				}, function errorCallback(response) {
					if (response.status == 400) {
						$scope.textError = response.data.message;
					}
					else {
						$scope.textError = 'Error';
					}
					$scope.formErrorSubmit = true;
					$scope.btnSubmited = false;
				}
			);
		};

	}]);

})();