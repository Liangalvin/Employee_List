var mongoose = require('mongoose');
// var Employee = mongoose.model("Employee");
var Employee = require('../models/Employee')

var employeeController = {};

employeeController.list = function(req, res){
  Employee.find({}).exec(function(err, employees){
    if(err){
      console.log("Error: ", err)
    } else {
      res.render('../views/employee/index', {employees: employees});
    }
  });
};

employeeController.show = function(req, res){
  Employee.findOne({_id: req.params.id}).exec(function(err, employee){
    if(err){
      console.log("Error: ", err)
    } else {
      res.render('../views/employee/show', {employee: employee});
    }
  });
};

employeeController.create = function(req, res){
  res.redirect('/employee');
};

employeeController.save = function(req, res){
  var employee = new Employee(req.body);

  employee.save(function(err){
    if(err){
      console.log("Error: ", err)
      res.render('../views/employee/create')
    } else {
      console.log("Employee Created")
      res.redirect('/employee');
    }
  });
};

employeeController.edit = function(req, res){
  Employee.findOne({_id: req.params.id}).exec(function(err, employee){
    if(err){
      console.log("Error: ", err);
    } else {
      res.render('../views/employee/edit', {employee: employee});
    }
  });
};

employeeController.update = function(req, res){
  Employee.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary}}, {new: true}, function(err, employee){
    if(err){
      console.log("Error: ", err)
      res.render('../views/employee/edit', {employee: req.body})
    }
    res.redirect('/employees')
  });
};

employeeController.delete = function(req, res){
  Employee.remove({_id: req.params.id}, function(err){
    if(err){
    console.log("Error: ", err)
    } else {
      console.log("Employee deleted!")
      res.redirect('/employees')
    }
  });
};

module.exports = employeeController;
