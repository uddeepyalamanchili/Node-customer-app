var model ={};


var students = [{id:1,Name:'name1',parentname:'parentname1',class:'class1',subject:'subject1',teacher:'teacher1',city:'city1',country:'country1'},
{id:2,Name:'name2',parentname:'parentname2',class:'class2',subject:'subject2',teacher:'teacher2',city:'city2',country:'country2'},
{id:3,Name:'name3',parentname:'parentname3',class:'class3',subject:'subject3',teacher:'teacher3',city:'city3',country:'country3'},
{id:4,Name:'name4',parentname:'parentname4',class:'class4',subject:'subject4',teacher:'teacher4',city:'city4',country:'country4'},
]

model.getRecords = function(){
	return students;
}
model.getRecordsById = function(id){
	for (var i = 0; i < students.length; i++) {
		if(id == students[i].id){
			return students[i];
		}
	}
	return {};
}
model.getSearch = function(text,field){
	var temp =[];
	for (var i = 0; i < students.length; i++) {
		if(students[i][field].includes(text)){
			temp.push(students[i]);
		}
	}
	return temp;
}

model.addRecord = function(record){
	return students.push(record);
}

model.deleteRecord = function(record){
	let temp = [];
	for (var i = 0; i < students.length; i++) {
		if(record.id != students[i].id){
			temp.push(students[i]);
		}
	}
	students = temp;
}

model.updateRecord = function(record){
	let student = record;
	for (var i = 0; i < students.length; i++) {
		if(student.id == students[i].id){
			students[i] = student;
		}
	}
}
module.exports = model;