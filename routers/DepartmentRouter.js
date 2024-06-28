const express = require('express');
const Router = express.Router();

const DepartmentController = require('../controller/Departmentontroller');
const DepartmentValidation =require('../modelware/validation/DepartmentValidation');
const {protect, restrictedTo} = require('../modelware/authorizationmiddlaware')

Router.route('/departments')
.post(protect,restrictedTo('admin'),DepartmentValidation.Department ,DepartmentController.addDepartment)
.get(protect,restrictedTo('admin'),DepartmentController.getAllDepartments)

Router.route('/department/doctors/:_id')
.get(protect,restrictedTo('admin'),DepartmentController.getDoctorInTheDepartment)

Router.route('/department/patients/:_id')
.get(protect,restrictedTo('admin'),DepartmentController.getPatientInTheDepartment)

Router.route('/department/:_id')
.get(protect,restrictedTo('admin'),DepartmentController.getDepartmentById)
.delete(protect,restrictedTo('admin'),DepartmentController.deleteDepartmentById)
.put(protect,restrictedTo('admin'),DepartmentController.updateDepartment)


module.exports = Router    