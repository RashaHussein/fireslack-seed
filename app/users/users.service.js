angular.module('angularfireSlackApp')
	.factory('Users', ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', function($firebaseArray, $firebaseObject, FirebaseUrl){
		var usersRef = new Firebase(FirebaseUrl+'users');
		var connectedRef = new Firebase(FirebaseUrl+'.info/connected')
		var users = $firebaseArray(usersRef);

		var Users = {
			getProfile: function(uid) {
				return $firebaseObject(usersRef.child(uid));
			},
			getDisplayName: function(uid) {
				return users.$getRecord(uid).displayName;
			},
			getGravatar: function(uid) {
				return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
			},
			/**
			* This function watches for changes at the .info/connected node
			* and will $add any open connections to a $firebaseArray
			* keyed under online within the user's profile.
			* This allows us to track multiple connections
			* (in case the user has multiple browser windows open),
			* which will get removed when the client disconnects.
			*/
			setOnline: function(uid){
			  var connected = $firebaseObject(connectedRef);
			  var online = $firebaseArray(usersRef.child(uid+'/online'));

			  connected.$watch(function (){
			    if(connected.$value === true){
			      online.$add(true).then(function(connectedRef){
			        connectedRef.onDisconnect().remove();
			      });
			    }
			  });
			},
			all: users
		};

		return Users;
	}]);