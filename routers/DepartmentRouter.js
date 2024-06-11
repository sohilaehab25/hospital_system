const express = require('express');
const Router = express.Router();

const DepartmentController = require('../controller/Departmentontroller');
const DepartmentValidation =require('../modelware/validation/DepartmentValidation');

Router.route('/departments')
.post(DepartmentValidation.Department ,DepartmentController.addDepartment)
.get(DepartmentController.getAllDepartments)

Router.route('/department/doctors/:_id')
.get(DepartmentController.getDoctorInTheDepartment)

Router.route('/department/patients/:_id')
.get(DepartmentController.getPatientInTheDepartment)

Router.route('/department/:_id')
.get(DepartmentController.getDepartmentById)
.delete(DepartmentController.deleteDepartmentById)
.put(DepartmentController.updateDepartment)


module.exports = Router    