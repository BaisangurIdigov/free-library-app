const { booksController } = require('../controllers/books.controller');
const { Router } = require('express')
const authMiddleware = require('../models/middlewares/auth.middlewares')
const router = Router()

router.get('/book', booksController.getBooks)
router.get('/book/:id', booksController.getBookById)
router.get('/books',authMiddleware, booksController.getAllBooks)
router.post('/books/:id/rend', authMiddleware ,booksController.rendBook)
router.post('/books', authMiddleware ,booksController.createBooks)
router.delete('/books/:id', authMiddleware ,booksController.deleteBooks)

module.exports = router