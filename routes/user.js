var express = require('express');
var router = express.Router();


const userController=require('../controllers/user.controller')
router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.addUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
module.exports = router;
