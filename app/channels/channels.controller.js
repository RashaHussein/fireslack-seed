angular.module('angularfireSlackApp')
	.controller('ChannelsCtrl', ['$state', 'Auth', 'Users', 'profile', 'channels', function($state, Auth, Users, profile, channels) {
		var channelsCtrl = this;

		channelsCtrl.profile = profile;
		channelsCtrl.channels = channels;

		channelsCtrl.users = Users.all;

		console.log('channelsCtrl.channels', channelsCtrl.channels);

		channelsCtrl.getDisplayName = Users.getDisplayName;
		channelsCtrl.getGravatar = Users.getGravatar;

		channelsCtrl.newChannel = {
			name: ''
		};

		// Set current user as online
		Users.setOnline(profile.$id);

		channelsCtrl.createChannel = function() {
			if(channelsCtrl.newChannel.name) {
				channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref) {
					$state.go('channels.messages', {channelId: ref.key()});
				});
			}
		};

		channelsCtrl.logout = function() {
			channelsCtrl.profile.online = null;
			channelsCtrl.profile.$save().then(function() {
				Auth.$unauth();
				$state.go('home');
			});
		};
	}]);