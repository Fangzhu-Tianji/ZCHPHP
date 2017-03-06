var student = require('./student');
var teacher = require('./teacher');

function adds(teacherName, students) {
	teacher.add(teacherName)
	students.forEach( function(element, index) {
		student.add(element);
	});
}

exports.adds = adds