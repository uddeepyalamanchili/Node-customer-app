var express = require('express');
var router = express.Router();
var customerModel = require('../model/customer');
var studentModel = require('../model/student');
var customerMySQL = require('../model/customer-mysql');
var studentMySQL = require('../model/student-mysql');
var customerMongodb = require('../model/customer-mongodb');
var studentMongodb = require('../model/student-mongodb');

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Customer app home page' });
});
router.get('/about', function(req, res, next) {
  res.render('home', { title: 'Customer app about page' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Customer app login page' });
});

/*
router.get('/customer', function(req, res, next) {
  res.render('customer', { title: 'Customers',customers:customerModel.getRecords() });
});*/



//customer data and its CRUD operations using mysql
/*
router.get('/customer', function(req, res, next) {
  let callback = (records)=>{
  res.render('customer', { title: 'Customers',customers:records });
}
  customerMySQL.getCustomers().then(callback);
});

router.get('/customer/add', function(req, res, next) {
  res.render('customerAdd', { title: 'Add Customer'});
});


router.get('/customer/edit/:id', function(req, res, next) {
	console.log("edit -- id"+req.params.id);
  let callback = (records)=>{
    res.render('customerEdit', { title: 'Update Customer', customer:records });
  }
  customerMySQL.getCustomerById(req.params.id).then(callback);
});

router.get('/customer/search/:text/:field', function(req, res, next) {
	console.log("text"+req.params.text)
	console.log('field'+req.params.field)
  let callback  = (records)=>{
  res.render('customer', { title: 'search Customer', customers:records });
}
 customerMySQL.searchCustomer(req.params.field,req.params.text).then(callback);
});
*/


//customer data and its CRUD operations using mongodb

router.get('/customer', function(req, res, next) {
  let callback = (records)=>{
  res.render('customer', { title: 'Customers',customers:records });
}
  customerMongodb.getCustomersPromise().then(callback);
});

router.get('/customer/add', function(req, res, next) {
  res.render('customerAdd', { title: 'Add Customer'});
});

router.get('/customer/edit/:id', function(req, res, next) {
  console.log("edit id"+req.params.id);
  let callback = (records)=>{
    res.render('customerEdit', { title: 'Update Customer', customer:records });
  }
  customerMongodb.getCustomerByIdPromise(req.params.id).then(callback);
});

router.get('/customer/search/:text/:field', function(req, res, next) {
	console.log("text"+req.params.text)
	console.log('field'+req.params.field)
  let callback  = (records)=>{
  res.render('customer', { title: 'search Customer', customers:records });
}
 customerMongodb.getCustomersBySearchPromise(req.params.field,req.params.text).then(callback);
});




//student data and their CRUD Operations using no database

//from the file
/*
router.get('/student', function(req, res, next) {
  res.render('student',{ title: 'Students',students:studentModel.getRecords() });
});

router.get('/student/add', function(req, res, next) {
  res.render('studentAdd', { title: 'Add student', students:studentModel.getRecords() });
});


router.get('/student/edit/:id', function(req, res, next) {
	console.log("id"+req.params.id)
  res.render('studentEdit', { title: 'Update student', student:studentModel.getRecordsById(req.params.id) });
});


router.get('/student/search/:text/:field', function(req, res, next) {
	console.log("text"+req.params.text)
	console.log('field'+req.params.field)
  res.render('student', { title: 'search student', students:studentModel.getSearch(req.params.text,req.params.field) });
});
*/

//student data and their CRUD Operations using MySQL database
/*
router.get('/student', function(req, res, next) {
  let callback = (records)=>{
    res.render('student',{ title: 'Students',students:records });
  }
  studentMySQL.getStudents().then(callback);
});

router.get('/student/add', function(req, res, next) {
    res.render('studentAdd',{ title: 'Add Students'});
});

router.get('/student/edit/:id', function(req, res, next) {
  console.log("id"+req.params.id)
  let callback = (records) =>{
    res.render('studentEdit', { title: 'Update student', student:records });
  }
  studentMySQL.getStudentById(req.params.id).then(callback);
});

router.get('/student/search/:text/:field', function(req, res, next) {
  console.log("text"+req.params.text)
  console.log('field'+req.params.field)
  let callback = (records) =>{
    res.render('student', { title: 'search student', students:records });
  }
  studentMySQL.searchStudent(req.params.text,req.params.field).then(callback);

});
*/

//student data and their CRUD Operations using mongodb database

router.get('/student', function(req, res, next) {
  let callback = (records)=>{
  res.render('student', { title: 'Students',students:records });
}
  studentMongodb.getStudentsPromise().then(callback);
});

router.get('/student/add', function(req, res, next) {
    res.render('studentAdd',{ title: 'Add Students'});
});

router.get('/student/edit/:id', function(req, res, next) {
  console.log("id"+req.params.id)
  let callback = (records) =>{
    res.render('studentEdit', { title: 'Update student', student:records });
  }
  studentMongodb.getStudentByIdPromise(req.params.id).then(callback);
});

router.get('/student/search/:text/:field', function(req, res, next) {
  console.log("text"+req.params.text)
  console.log('field'+req.params.field)
  let callback = (records) =>{
    res.render('student', { title: 'search student', students:records });
  }
  studentMongodb.getStudentsBySearchPromise(req.params.field,req.params.text).then(callback);

});
module.exports = router;
