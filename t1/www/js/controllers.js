angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, DeepLink) {
  $scope.content = {}
  linkButtonRender(false, null);


  function linkButtonRender(loading, url) {
    $timeout(function() { // timeout to cause dom update
      $scope.content.data = JSON.stringify(DeepLink.get());
      $scope.content.linkUrl = url;
      $scope.content.linkTitle = url ? url : "Branch Deep Link";
      $scope.content.linkLoading = loading;
      $scope.content.linkButton = loading ? "Loading..." : "Generate";
    }, 0);
  }

  $scope.linkButtonPressed = function() {
    linkButtonRender(true, null);
    BranchDeepLink(function(data) {
      linkButtonRender(false, data);
    });
  };

  $scope.sharesheetButtonPressed = function() {
    BranchShareSheet("hello");
  };

  $scope.spotlightButtonPressed = function() {

  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
