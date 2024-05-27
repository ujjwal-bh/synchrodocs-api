const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middlewares/authentication');

const { createUser, updateUser, getAllUsers, resetPassword, getSingleUser, getCurrentUser, deleteUser } = require('./controllers');
const { login, logout } = require('./authControllers');

router.route('/')
.post(createUser)
.get([authenticateUser], getAllUsers)

router.post('/auth/login',login)
router.get('/auth/logout',[authenticateUser] , logout)
router.get('/me',[authenticateUser], getCurrentUser)


router.route('/:id')
.patch([authenticateUser], updateUser)
.get([authenticateUser], getSingleUser)
.delete([authenticateUser], deleteUser)

router.post('/:id/resetPassword',[authenticateUser], resetPassword)

module.exports = router;