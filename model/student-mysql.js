var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'yup123456',
  database        : 'nodejs'
});

var service = {};
service.getStudents = async function(){//returns a promise always - ( async )
  var students = [];
  var sql = "SELECT * FROM students";
  await new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); resolve(); return students;}
      // make the query
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) { console.log(err); resolve();}
        students = results;
        resolve();
      });
    });
  });
 return students;//argument to Promise
}

/*
service.getStudentById = async function(id){//returns a promise always - ( async )
  var students = {};
  var sql = "SELECT * FROM students where id='"+id+"'";
  await new Promise((resolve, reject) => {
  	console.log("sql:"+sql);
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); resolve(); return ;}
      // make the query
      connection.query(sql, function(err, results) {
        connection.release();
        if(err) { console.log(err); resolve();return;}
        if(results.length == 0){
        resolve(record);
      }
        resolve(results[0]);
      });
    });
  });
 //return students;//argument to Promise
}*/

service.getStudentById = function(id){//returns a promise always - ( async )
  var record = {};
  var sql = "SELECT * FROM students where id='"+id+"'";
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

service.updateStudents =  function(student) {
   return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
          resolve({result:"fail", msg:'student addition failed.'});
           }
          connection.query("UPDATE students set ? WHERE id = ?",[student,student.id], function(err, results) {
          connection.release();
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail", msg:'student updation failed.'});
          }else{
           resolve({result:"success", msg:'student updated ok.'})
         }
      });
    });
    });
};
service.deleteStudents =  function(id) {
	var sql = "DELETE FROM students where id='"+id+"'";
   return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
          resolve({result:"fail", msg:'student deletion failed.'});
           }
          connection.query(sql, function(err, results) {
          connection.release();
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail", msg:'student deletion failed.'});
          }else{
           resolve({result:"success", msg:'student deletion ok.'})
         }
      });
    });
    });
};
service.searchStudent = (field,searchText) => {
  var record = {};
  var sql = "SELECT * FROM students where "+field+" like '%"+searchText+"%'";
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


service.addStudents =  function(student) {
   return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
        if(err) { console.log(err); 
          resolve({result:"fail", msg:'student addition failed.'});
           }
          connection.query("INSERT INTO students set ? ",student, function(err, results) {
          connection.release();
          if(err){
           console.log("Error Selecting : %s ",err );
           resolve({result:"fail", msg:'student addition failed.'});
          }else{
           resolve({result:"success", msg:'student added ok.'})
         }
      });
    });
    });
};

module.exports = service;