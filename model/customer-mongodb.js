var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';

service.getCustomersPromise = function(){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customer').find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result);
      });
  });
 });
};


service.addCustomersPromise = function(record){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customer');
      collection.insertMany([record],function(err,result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'customer added ok.'})
      });
  });
 });
};

service.deleteCustomersPromise = function(record){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customer');
    collection.deleteOne({"_id" : ObjectId(record.id)},function(err,result){
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'customer deleted ok.'})
      });
  });
 });
};


service.updateCustomersPromise = function(customer){
  let id = customer.id;
    delete(customer.id);
    console.log('id '+id);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customer');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
        if (err) throw err;
        console.log(result);
        client.close();
        resolve({result:"success", msg:'customer updated ok.'})
      });
  });
 });
};


service.updateCustomer = function(customer,callback){
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      callback({result:'success'});
      client.close();
    });
  });
};

service.getCustomerByIdPromise = function(id){
  var record = {};
  console.log(">> getCustomerById "+ id);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    db.collection('customer').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result[0])
      });
  });
 });
};

service.getCustomerById = function(id,callback){
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result[0]);
        client.close();
      });
  });
};

service.getCustomersBySearchPromise = function(field,searchText){
    var records = [];
    console.log("field:"+field);
    console.log("searchText:"+searchText);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customer');
    db.collection('customer').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        resolve(result);
      });
  });
 });
};

service.getCustomersBySearch = function(field,searchText,callback){
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
        client.close();
      });
  });
}

service.deleteCustomer = function(id,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      callback({result:'success'});
      client.close();
    });  
  });
};
service.addCustomer = function(record,callback) {
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
      client.close();
    });
  });
}

service.getCustomers = function(callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result);
        client.close();
      });
  });
};

service.getCustomerById = function(id,callback){
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result[0]);
        client.close();
      });
  });
};



service.deleteCustomer = function(id,callback){
  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      callback({result:'success'});
      client.close();
    });  
  });
};

service.updateCustomer = function(customer,callback){
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      callback({result:'success'});
      client.close();
    });
  });
};

service.getCustomersBySearch = function(field,searchText,callback){
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    console.log("field:"+field);
    console.log("searchText:"+searchText);

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({[field]:{'$regex' : searchText, '$options' : 'i'}}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
        client.close();
      });
  });
}
//sqlService.getCustomersBySearch(searchParam,callback);
service.getCustomersBySearchOLD = function(searchParam,callback){
    var records = [];
    //searhObject = {searchParam.field: '//i'}
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({name: /vivek/i}).toArray(function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
        client.close();
      });
  });
}

module.exports=service;
