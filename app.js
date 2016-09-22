var app = angular.module('myApp', []);

app.controller('SpCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.albums = [];
  $scope.tracks=[];
  var audioEle = null;
   $scope.buttonStatus = "Play";
  $scope.searchArtist = function() {
    var q = $scope.artist;
    console.log(q);
    if (event.keyCode == 13 || event.type =='click') {
      $http.get('https://api.spotify.com/v1/search', {
        params: {
          q: q,
          type: 'album'
        }
      }).then(function(data) {
        $scope.albums = data.data.albums.items;
      }).catch(function(error) {
        return error;
      });
    }
  }

  $scope.getAlbumTracks = function(id) {
    $http.get('https://api.spotify.com/v1/albums/' + id).then(function(data) {
     $scope.tracks = data.data.tracks.items[0].preview_url;
     if(audioEle == null){
        audioEle = new Audio(data.data.tracks.items[0].preview_url);
        audioEle.play();
       $scope.buttonStatus = "Pause";
       }else if(audioEle != null){
        audioEle.pause();
        audioEle = null;
        $scope.buttonStatus = "Play";
      }
    }).catch(function(error) {
      return error;
    });
  }

}]);
