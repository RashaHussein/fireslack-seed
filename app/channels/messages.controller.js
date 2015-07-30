angular.module('angularfireSlackApp')
	.controller('MessagesCtrl', ['profile', 'channelName', 'messages', function(profile, channelName, messages) {
		var messagesCtrl = this;

		messagesCtrl.channelName = channelName;
		messagesCtrl.messages = messages;

		messagesCtrl.message = '';

		messagesCtrl.sendMessage = function() {
			console.log("trying to send");
			if(messagesCtrl.message.length > 0) {
				console.log("inside");
				messagesCtrl.messages.$add({
					uid: profile.$id,
					body: messagesCtrl.message,
					timestamp: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					console.log(messagesCtrl.messages);
					messagesCtrl.message = '';
				});
			}
		};
	}]);