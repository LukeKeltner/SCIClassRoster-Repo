$(document).ready(function() 
{
	var userName;
	var userTime;

	var classTimes = ['Monday 1/1 7:00pm', 'Tuesday 1/2 4:00pm', 'Wednesday 1/3 6:30pm', 'Thursday 1/4 7:00pm']

	var putStudentInClass = $('.class-table')
	var classOptionsTable = $('.class-options-table')

	var students = ['Luke', 'Jason', 'Amanda']

	for (var i=0; i<classTimes.length; i++)
	{
		$('.class'+i).html(classTimes[i])

		var inputClass = $('<tr><td>'+classTimes[i]+'</td></tr>');
		inputClass.attr('class', 'user-time')
		inputClass.attr('id', i)
		classOptionsTable.append(inputClass)
	}

	for (var i=0; i<students.length; i++)
	{
		var newStudent = $('<tr><td>'+students[i]+'</td></tr>')
		newStudent.attr('class', 'user-name')
		$('.student-table').append(newStudent)
	}

	$('.user-name').on('click', function()
	{
    	userName = $(this).text()
    	$('#confirm-name').html(userName)
	});

	$('.user-time').on('click', function()
	{
    	var time = $(this).text()
    	userTime = $(this).attr("id")
    	$('#confirm-time').html(time)
    	console.log(userTime)
	});

	$('.submit').on('click', function()
	{
		$('#'+userTime).append('<tr><td>'+userName+'</td></tr>')
	})





})