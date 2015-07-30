angular.module('angularfireSlackApp')
	.factory('Messages', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {
		var channelMessagesRef = new Firebase(FirebaseUrl+'channelMessages');
		var userMessagesRef = new Firebase(FirebaseUrl+'userMessages');

		return {
			forChannel: function(channelId) {
				return $firebaseArray(channelMessagesRef.child(channelId));
			},
			forUsers: function(uid1, uid2) {
				// Since we always want to reference the same path
				// in our Firebase regardless of which id was passed first,
				// we'll need to sort our ids before referencing the direct messages.
				var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1

				return $firebaseArray(userMessagesRef.child(path));
			}
		};
	}]);