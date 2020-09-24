var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';

service.getStudentsPromise = function(){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('student').find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result);
      });
  });
 });
};

service.addStudentsPromise = function(record){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('student');
      collection.insertMany([record],function(err,result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'student added ok.'})
      });
  });
 });
};

service.deleteStudentsPromise = function(record){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('student');
    collection.deleteOne({"_id" : ObjectId(record.id)},function(err,result){
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'student deleted ok.'})
      });
  });
 });
};

service.getStudentByIdPromise = function(id){
  var record = {};
  console.log(">> getStudentById "+ id);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('student').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result[0])
      });
  });
 });
};

service.updateStudentsPromise = function(student){
  let id = student.id;
    delete(student.id);
    console.log('id '+id);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('student');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: student },function(err,result){
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'student updated ok.'})
      });
  });
 });
};

service.getStudentsBySearchPromise = function(field,searchText){
    var records = [];
    console.log("field:"+field);
    console.log("searchText:"+searchText);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('student');
    db.collection('student').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result);
      });
  });
 });
};


module.exports=service;