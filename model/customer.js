var model ={};

var customers = [{id:1,Name:'uddip',email:'uddip@gmail.com',phn:'123456789',address:'delhi'},
{id:2,Name:'name2',email:'name2@gmail.com',phn:'1234567890',address:'goa'},
{id:3,Name:'name3',email:'name3@gmail.com',phn:'0987654321',address:'pune'},
{id:4,Name:'name4',email:'name4@gmail.com',phn:'5432167890',address:'hyderabad'}
]

model.getRecords = function(){
	return customers;
}

model.getRecordsById = function(id){
	for (var i = 0; i < customers.length; i++) {
		if(id == customers[i].id){
			return customers[i];
		}
	}
	return {};
}
model.getSearch = function(text,field){
	var temp=[];//temp shoudld be array not an object
	for (var i = 0; i < customers.length; i++) {
		if(customers[i][field].startsWith(text)){
			temp.push(customers[i]);
		}
	}
	return temp;
} 

model.addRecord = function(record){
	return customers.push(record);
}

model.deleteRecord = function(record){
	let temp = [];
	for (var i = 0; i < customers.length; i++) {
		if(record.id != customers[i].id){
			temp.push(customers[i]);
		}
	}
	customers = temp;
}

model.updateRecord = function(record){
	let customer = record;
	for (var i = 0; i < customers.length; i++) {
		if(customer.id == customers[i].id){
			customers[i] = customer;
		}
	}
}
module.exports = model;