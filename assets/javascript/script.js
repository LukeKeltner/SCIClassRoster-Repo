$(document).ready(function() 
{
	var namePicked = false;
	var timePicked = false;
	var userName;
	var userTime;
	var index;
	var deleteRow;
	var maxClassSize;

	var classTimes = ['Monday 1/1 7:00pm', 'Tuesday 1/2 4:00pm', 'Wednesday 1/3 6:30pm', 'Thursday 1/4 7:00pm']

	var putStudentInClass = $('.class-table')
	var classOptionsTable = $('.class-options-table')

	var students = ['Luke', 'Jason', 'Amanda', 'Randy', 'Jessica', 'Lauren', 'Maggy', 'Jack', 'Sam', 'Zach', 'Danny', 'Carol', 'Tom', 'Larry', 'Terry']


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

	getCurrentStudents()

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