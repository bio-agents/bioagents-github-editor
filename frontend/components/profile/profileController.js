angular.module('iechor_front')
.controller('ProfileController', ['$scope', '$state', 'djangoAuth', 'DisownAgentService', 'User', function($scope, $state, djangoAuth, DisownAgentService, User) {
	$scope.profile = {};
	$scope.loading = true;
	$scope.User = User;
	djangoAuth.profile()
	.then(function (response) {
		$scope.profile = response;
		$scope.loading = false;
	}, function (response) {
		$scope.loading = false;
	});

	$scope.disownEntry = function(entry) {
		DisownAgentService.disown({id: entry.id, version: entry.versionId}, function(response) {
			$scope.profile.resources = _.difference($scope.profile.resources, [entry]);
		}, function(response) {
			alert("Failed to disown " + entry.name + ". Please check your connection and try again later.");
		});
	}
}]);