

var app = angular.module('Notes', []);


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + "h:" + m + "m:" + s + "s";
    var t = setTimeout(startTime, 200);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

app.controller('notes', function($scope, $rootScope, $timeout) {
	var i;
	// localStorage.notes ='';

    if(localStorage.notes) {
    	$scope.notes = JSON.parse(localStorage.notes);
    }	
    else $scope.notes = [{title: "AngularJS", text: 'Learn AngularJS', dateInit: $rootScope.update, update: $rootScope.update, check: false},
    	{title: "BootStrap", text: 'Learn BootStrap', dateInit: $rootScope.update, update: $rootScope.update, check: false}
    ];

    $scope.Set = function(index){
    	var x = $scope.notes[index];
    	$scope.text = x.text;
    	$scope.title = x.title;
    	$scope.dateInit = x.dateInit;
    	$scope.update = x.update;
    	$scope.check = x.check;
    	i = index;
    }

    $scope.Add = function() {
    	$scope.title = "NEW";
    	$scope.dateInit = $rootScope.update;
    	$scope.update = $rootScope.update;
    	$scope.check = false;
    	$scope.text = "NEW";
    	i = $scope.notes.length;
    }

    $scope.Save = function() {
    	$rootScope.newdate = new Date();
    	if(i<0 || i>$scope.notes.length)	$scope.err = "Click new note (+)";
		else if(i==$scope.notes.length)  $scope.notes.push({
    		title: $scope.title,
			text: $scope.text,
			dateInit: new Date(),
			update: new Date(),
			check: false
		});
		else if(i>=0 && i<$scope.notes.length)  {
			$scope.notes[i].title = $scope.title;
			$scope.notes[i].text = $scope.text;
			$scope.notes[i].dateInit = $scope.dateInit;
			$scope.notes[i].update = new Date();
			$scope.notes[i].check = $scope.check;
		}

    	localStorage.notes = JSON.stringify($scope.notes);
    	$scope.text = '';
    	$scope.title = '';
    	i = -1;
    	$scope.check = false;
    	$scope.dateInit = '';
    	$scope.update = '';
    	$timeout(function(){
    		$scope.err = "";
    	},2000);
    	
    }

	$scope.Delete = function() {
		var oldNotes = $scope.notes;
		
		if(i>=0)	delete $scope.notes[i];
		$scope.notes = [];
		angular.forEach(oldNotes, function(oldNote){
			if(oldNote.text + oldNote.title != "" || oldNote.text + oldNote.title != 'NEWNEW') {
					$scope.notes.push(oldNote)
			}

		});
		localStorage.notes = JSON.stringify($scope.notes);

		$scope.title = "";
    	$scope.dateInit = '';
    	$scope.update = '';
    	$scope.check = false;
    	$scope.text = "";
	}



});

