var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'yup123456',
  database        : 'nodejs'
});
 
var service = {};

service.getRecords = function(callback){
  var sql = "SELECT * FROM customer";
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback([]); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback([]); return; }
      callback(results);
    });
  });
};

service.getCustomers = async function(){//returns a promise always - ( async )
  var customers = [];
  var sql = "SELECT * FROM customer";
  await new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); resolve(); return customers;}
      // make the query
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) { console.log(err); resolve();}
        customers = results;
        resolve();
      });
    });
  });
 return customers;//argument to Promise
}
service.addCustomer =  function(customer) {
   return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
          resolve({result:"fail", msg:'customer addition failed.'});
           }
          connection.query("INSERT INTO customer set ? ",customer, function(err, results) {
          connection.release();
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail", msg:'customer addition failed.'});
          }else{
           resolve({result:"success", msg:'customer added ok.'})
         }
      });
    });
    });
};

service.getCustomerById = (id) => {
  var record = {};
  var sql = "SELECT * FROM customer where id='"+id+"'";
  return new Promise((resolve, reject) => {
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); resolve({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); resolve({}); return; }
      if(results.length == 0){
        resolve(record);
      }
      resolve(results[0]);
    });
  });
  });
};
service.searchCustomer = (field,searchText) => {
  var record = {};
  var sql = "SELECT * FROM customer where "+field+" like '%"+searchText+"%'";
  return new Promise((resolve, reject) => {
  console.log("sql:"+sql);
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); resolve({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); resolve({}); return; }
      if(results.length == 0){
        resolve(record);
      }
      resolve(results);
    });
  });
  });
};

service.updateCustomer = (customer) =>{
  return new Promise((resolve, reject) => {
  pool.getConnection(function(err, connection) {
        if(err) { console.log(err); resolve({result:"fail"}); return; }
        connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail"});
          }else{
           resolve({result:"success"});
         }
      });
    });
   });
};
service.deleteCustomer = function(id){
  var customers = [];
  console.log('sql : '+id);
  var sql = "DELETE FROM customer where id='"+id+"'";
  return new Promise((resolve,reject)=>{
       pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
          resolve({result:"fail",msg:"customer deletion failed"});}
          connection.query(sql,function(err,results){
            connection.release();
            if(err){
              console.log(err);resolve();
            }
            resolve({result:'success',msg:"customer deletion successfull"});
          
          
      });
    });
  });
}

module.exports = service;