const express = require('express');
const Router = express.Router();

const DepartmentController = require('../controller/Departmentontroller');
const DepartmentValidation =require('../modelware/validation/DepartmentValidation');

Router.route('/departments')
.post(DepartmentValidation.Department ,DepartmentController.addDepartment)

module.exports = Router    