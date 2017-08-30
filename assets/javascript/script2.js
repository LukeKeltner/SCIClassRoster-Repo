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
  	var notPickedList = $('#not-picked-list')
  	var namePicked = '';
  	var classPicked = '';
  	var confirmName = $('#confirm-name')

	var completeStudentList = ['Rebecca', 'Jennie', 'Luke']

	database.ref('students').once('value', function(snap)
	{
		if (!snap.hasChild('notPicked'))
		{
			notPickedList.empty()

			for (var i=0; i<completeStudentList.length; i++)
			{
				database.ref('students/notPicked/'+i).set(completeStudentList[i])
				var student = $("<li class='list-group-item'>"+completeStudentList[i]+"</li>")
				student.addClass('not-picked-student')
				student.data('data-name', completeStudentList[i])
				notPickedList.append(student)
			}
		}

		else if (snap.hasChild('notPicked'))
		{
			notPickedList.empty()
			tempStudents = []

			for (var i=0; i<completeStudentList.length; i++)
			{
				if (snap.val().notPicked[i] !== undefined)
				{
					tempStudents.push(snap.val().notPicked[i])
				}
			}

			for (var i=0; i<tempStudents.length; i++)
			{
				database.ref('students/notPicked/'+i).set(tempStudents[i])
				var student = $("<li class='list-group-item'>"+tempStudents[i]+"</li>")
				student.addClass('not-picked-student')
				student.data('data-name', tempStudents[i])
				notPickedList.append(student)
			}
		}
	})

	$(document).on('click', '.not-picked-student', function(event)
	{
		namePicked = $(this).text()
		confirmName.html(namePicked)
	})
})