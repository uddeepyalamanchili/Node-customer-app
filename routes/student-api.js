var express = require('express');
var router = express.Router();
var studentModel = require('../model/student');
var studentMySQL = require('../model/student-mysql');
var studentMongodb = require('../model/student-mongodb');

/*
router.get('/', function (req, res) {
	res.send(studentModel.getRecords());
});

router.put('/', function (req, res) {
	let student = req.body;
	studentModel.updateRecord(student);
	res.send({result:'success', msg:'student updated successfully.'});
});


router.delete('/', function (req, res) {
	let student = req.body;
	studentModel.deleteRecord(student);
	res.send({result:'success', msg:'student delete successfully.'});
});

router.post('/', function (req, res) {
	studentModel.addRecord(req.body);
	res.send({result:'success', msg:'student added successfully.'});
});*/

//using the MySQL - database for data

/*
router.get('/', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
	studentMySQL.getStudents().then(callback);
});

router.post('/', function (req, res) {
	console.log("post  ... customer");
	let callback = (result) => res.send(result);
	studentMySQL.addStudents(req.body).then(callback);
});

router.put('/', function (req, res) {
	let student = req.body;
	let callback = (result) => res.send(result);
	studentMySQL.updateStudents(student).then(callback);
});

router.delete('/', function (req, res) {
	let student = req.body;
	let callback = (result) => res.send(result);
	studentMySQL.deleteStudents(student.id).then(callback);//be careful with the parameters
});
*/


//using the mongodb - database for data

router.get('/', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
	studentMongodb.getStudentsPromise().then(callback);
});

router.post('/', function (req, res) {
	console.log("post  ... student");
	let callback = (result) => res.send(result);
	studentMongodb.addStudentsPromise(req.body).then(callback);
});

router.delete('/', function (req, res) {
	let student = req.body;
	let callback = (result) => res.send(result);
	studentMongodb.deleteStudentsPromise(student).then(callback);//be careful with the parameters
});

router.put('/', function (req, res) {
	let student = req.body;
	let callback = (result) => res.send(result);
	studentMongodb.updateStudentsPromise(student).then(callback);
});

module.exports = router;