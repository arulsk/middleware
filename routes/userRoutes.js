const express = require('express');
const route = express.Router();
const userController = require('../controller/usercontroller');

route.post('/createUser',userController.createUser);
route.get('/getUsers',userController.getUsers);
route.get('/getUserById/:id',userController.getUserById);
route.put('/updateUser/:id',userController.updateUsers);
route.delete('/deleteUser/:id',userController.deleteUser);
route.get('/noOfUsers',userController.numberOfUser);
route.get('/getUserWithHighestId',userController.getUserWithHighestId);
route.get('/getUserWithLowestId',userController.getUserWithLowestId)
route.get('/getUserByName',userController.getUserbyName);
route.get('/byEmail',userController.findByEmail)
route.get('/findByCity',userController.findByCity)
module.exports = route;