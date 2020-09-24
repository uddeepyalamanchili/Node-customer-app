var express = require('express');
var router = express.Router();
var customerModel = require('../model/customer');
var customerMySQL = require('../model/customer-mysql');
var customerMongodb = require('../model/customer-mongodb');

/*
router.get('/', function (req, res) {
	res.send(customerModel.getRecords());
});

router.get('/', function (req, res) {
	let callback = (records) =>{
		res.send(records);
	}
	//res.send(customerModel.getRecords());
	// setTimeout // async
	customerMySQL.getRecords(callback);
});*/


//using the mysql - database for data

/*
router.put('/', function (req, res) {
	let customer = req.body;
	//console("update "+req.body); never write req.body in the console ==>results in error
	let callback = (result) =>{res.send(result);};
	customerMySQL.updateCustomer(customer).then(callback);
	
});

router.delete('/', function (req, res) {
	console.log("delete   ... customer");
	let callback = (result) => 
	{res.send(result);}
	let customer = req.body;
	customerMySQL.deleteCustomer(customer.id).then(callback);
});

router.post('/', function (req, res) {
	console.log("post  ... customer");
	let callback = (result) => res.send(result);
	customerMySQL.addCustomer(req.body).then(callback);
});


router.get('/', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
	customerMySQL.getCustomers().then(callback);
});
*/


//using the mongodb - database for data

router.put('/', function (req, res) {
	let customer = req.body;
	console.log("in put of db");
	console.log("update "+JSON.stringify(req.body)); //never write req.body in the console ==>results in error
	let callback = (result) =>{res.send(result);};
	customerMongodb.updateCustomersPromise(customer).then(callback);
	
});

router.get('/', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
	customerMongodb.getCustomersPromise().then(callback);
});
router.get('/:id', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
	customerMongodb.getCustomerByIdPromise(req.params.id).then(callback);
});
router.post('/', function (req, res) {
	console.log("post  ... customer");
	let callback = (result) => res.send(result);
	customerMongodb.addCustomersPromise(req.body).then(callback);
});

router.delete('/', function (req, res) {
	console.log("delete   ... customer");
	let callback = (result) => 
	{res.send(result);}
	let customer = req.body;
	console.log("delete "+JSON.stringify(req.body));
	customerMongodb.deleteCustomersPromise(req.body).then(callback);
});
module.exports = router;