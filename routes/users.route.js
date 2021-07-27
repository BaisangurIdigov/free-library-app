const authMiddleware = require('./../models/middlewares/auth.middlewares')
const { userController } = require('../controllers/users.controller');
const { Router } = require('express')

const router = Router()
router.get('/', userController.getAllUsers)
router.get('/users',authMiddleware, userController.getUsersId)
// router.post('/avatar', authMiddleware, userController.avatarAdd)
router.post('/users', userController.registerUser)
router.post('/login', userController.login)



module.exports = router