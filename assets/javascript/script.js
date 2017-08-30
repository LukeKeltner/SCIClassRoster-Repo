$(document).ready(function() 
{
	  // Initialize Firebase
	var config = 
	{
		apiKey: "AIzaSyAfuG7PnzqM5KfHrgbCYOFhTky5C4_mKww",
	    authDomain: "sci-i-scheduling.firebaseapp.com",
	    databaseURL: "https://sci-i-scheduling.firebaseio.com",
	    projectId: "sci-i-scheduling",
	    storageBucket: "",
	    messagingSenderId: "860012777169"
	};

  	firebase.initializeApp(config);

  	var database = firebase.database()

	var namePicked = false;
	var timePicked = false;
	var userName;
	var userTime;
	var index;
	var deleteRow;
	var maxClassSize;
	var test = true;

	var classTimes = ['Monday 1/1 7:00pm', 'Tuesday 1/2 4:00pm', 'Wednesday 1/3 6:30pm', 'Thursday 1/4 7:00pm']

	var putStudentInClass = $('.class-table')
	var classOptionsTable = $('.class-options-table')

	var students = ['Brendan', 'Luke', 'Jason', 'Amanda', 'Randy', 'Jessica', 'Lauren', 'Maggy', 'Jack', 'Sam', 'Zach', 'Danny', 'Carol', 'Tom', 'Larry', 'Terry']

	console.log("Hi!")

	database.ref('students').once('value', function(snap)
	{
		var studentContainer = $('.student-container')
		var studentTable = $('<table class=\"table table-striped table-hover student-table\">')
		var tableBody = $('<tbody>')
		studentContainer.html(studentTable)
		studentTable.html(tableBody)
		tableBody.html('<tr><th><h2>Who are You?</h2></th></tr>')

		if (!snap.hasChild('notPicked'))
		{
			console.log("notPicked does NOT exist.  Creating it now...")

			for (var i=0; i<students.length; i++)
			{
				database.ref('students/notPicked/'+i).set(students[i])
				var newStudent = $('<tr><td>'+students[i]+'</td></tr>')
				newStudent.attr('class', 'user-name')
				$('.student-table').append(newStudent)
			}
		}

		else if (snap.hasChild('notPicked'))
		{
			var tempStudents = []

			console.log("notPicked DOES exist.  Here is the snap value")
			console.log(snap.val().notPicked)

			for (var i=0; i<students.length; i++)
			{
				if (snap.val().notPicked[i] !== undefined)
				{
					tempStudents.push(snap.val().notPicked[i])
				}
				
			}

			console.log("there are "+tempStudents.length+" amount of students in tempStudents")
			console.log("temp students: "+tempStudents)
			database.ref('/students/notPicked').remove()

			for (var i=0; i<tempStudents.length; i++)
			{
				database.ref('students/notPicked/'+i).set(tempStudents[i])
				var newStudent = $('<tr><td>'+tempStudents[i]+'</td></tr>')
				newStudent.attr('class', 'user-name')
				$('.student-table').append(newStudent)
			}
		}
	})

/*		database.ref('players').once('value').then(function(snap)
		{
			console.log(snap.hasChild('notPicked'))

			if (!snap.hasChild('not-picked'))
			{
				console.log("not picked does NOT exist.  Creating it now...")
				for (var i=0; i<students.length; i++)
				{
					database.ref('students/not-picked/'+i).set(students[i])
				}
			}

			else if (snap.hasChild('not-picked'))
			{
				console.log("not picked DOES exist.  Here is the snap value")
				console.log(snap.val())
			}
		})*/

		
/*		for (var i=0; i<snap.val().length; i++)
		{
			console.log(snap.val()[i])
			var newStudent = $('<tr><td>'+snap.val()[i]+'</td></tr>')
			newStudent.attr('class', 'user-name')
			$('.student-table').append(newStudent)
		}*/
	/*})*/


	function resetStudentList()
	{
		var studentContainer = $('.student-container')
		var studentTable = $('<table class=\"table table-striped table-hover student-table\">')
		var tableBody = $('<tbody>')

		studentContainer.html(studentTable)
		studentTable.html(tableBody)
		tableBody.html('<tr><th><h2>Who are You?</h2></th></tr>')
	}

	function getCurrentStudents()
	{
		for (var i=0; i<students.length; i++)
		{
			var newStudent = $('<tr><td>'+students[i]+'</td></tr>')
			newStudent.attr('class', 'user-name')
			$('.student-table').append(newStudent)
		}
	}

	function placeStudent(i)
	{
		database.ref('students/notPicked/'+i).remove()
	}

	maxClassSize = Math.floor(students.length/4)+1

	$('.students-left').html(maxClassSize)

	for (var i=0; i<classTimes.length; i++)
	{
		$('.class'+i).html(classTimes[i])

		var inputClass = $('<tr><td>'+classTimes[i]+'</td></tr>');
		inputClass.attr('class', 'user-time')
		inputClass.attr('id', i)
		classOptionsTable.append(inputClass)
	}

	//getCurrentStudents()

	$('.submit').on('click', function()
	{
		if (namePicked && timePicked)
		{
			students.splice(index, 1)
			resetStudentList()
			$('#'+userTime).append('<tr><td>'+userName+'</td></tr>')
			console.log(students)
			getCurrentStudents()
			namePicked = false;
			timePicked = false;
			$('#confirm-name').html("")
			$('#confirm-time').html("")
			var studentsLeft = $('.students-left.'+userTime).text()
			var x = parseInt(studentsLeft) - 1
			$('.students-left.'+userTime).html(x)

			if (x===0)
			{
				$('.label-danger.'+userTime).show()
				console.log('.label-danger.'+userTime)
			}
		}
		
	})

	$(document).on('click', '.user-name', function()
	{
		namePicked = true;
    	userName = $(this).text()
    	console.log(userName)
    	index = students.indexOf(userName)
    	placeStudent(index)
    	$('#confirm-name').html(userName)
    	console.log(event)
	});

	$(document).on('click', '.user-time', function()
	{
    	var time = $(this).text()
    	userTime = $(this).attr("id")
    	var studentsLeft = parseInt($('.students-left.'+userTime).text())

    	if (studentsLeft===0)
    	{
    		timePicked = false;
    		$('#confirm-time').html('That class is full!')
    	}

    	else
    	{
			timePicked = true;
    		var time = $(this).text()
    		$('#confirm-time').html(time)
    		console.log(userTime)
    	}
	});
})