$(document).ready(function() 
{
	var userName;
	var userTime;
	var index;

	var classTimes = ['Monday 1/1 7:00pm', 'Tuesday 1/2 4:00pm', 'Wednesday 1/3 6:30pm', 'Thursday 1/4 7:00pm']

	var putStudentInClass = $('.class-table')
	var classOptionsTable = $('.class-options-table')

	var students = ['Luke', 'Jason', 'Amanda']


	function resetStudentList()
	{
		$('.student-container').html('<table class=\"table table-striped table-hover student-table\">')
		$('.student-table').html('<th><h2>Who are You?</h2></th>')
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
		students.splice(index, 1)
		resetStudentList()
		$('#'+userTime).append('<tr><td>'+userName+'</td></tr>')
		console.log(students)
		getCurrentStudents()
	})

	$(document).on('click', '.user-name', function()
	{
    	userName = $(this).text()
    	console.log(userName)
    	index = students.indexOf(userName)
    	$('#confirm-name').html(userName)
    	console.log(event)
	});

	$('.user-time').on('click', function()
	{
    	var time = $(this).text()
    	userTime = $(this).attr("id")
    	$('#confirm-time').html(time)
    	console.log(userTime)
	});

})