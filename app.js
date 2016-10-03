var app = angular.module('myApp', []);

/*A socket factory created to facilitate the use socket everywhere.*/
app.factory('socket', function($rootScope) {
    var socket = io.connect('http://localhost:8090'); //The io variable value comes from server. This is initialized in index.html
    return { //return on and emit
        on: function(eventName, callback) { //eventname is the channel name and callback is the function that needs to be executed when the event is triggered. 
            socket.on(eventName, function() {
                var args = arguments; //currently no other arguments, but a provision is made for the same.
                $rootScope.$apply(function() { //refreshing the digest cycle to include the callback function in the rootscope.
                    callback.apply(socket, args); 
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

app.controller('testCntrl', ['$scope', 'socket', '$http', function($scope, socket, $http) {
	$http.get('http://localhost:8090/emit')
	.then(function(response){
		console.log(response.data);
	}, function(error){
		console.log(error.data);
	});
    socket.on('testing', function(response) { //opening the connection.
    	console.log(response);
    });
}]);
