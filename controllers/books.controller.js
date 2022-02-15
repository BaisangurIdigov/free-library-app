const Books = require("../models/Book.model");

module.exports.booksController = {
  getBooks: async (req, res) => {
    const books = await Books.find().populate("user");
    res.json(books);
  },
  getAllBooks: async (req, res) => {
    const books = await Books.find({
      user: req.user.id,
    }).populate("user");
    res.json(books);
  },

  getRendBooks: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.find({ "rend.userRend": req.user.id });
      res.json(books);
    } catch (e) {
      return e.toString();
    }
  },

  getBookById: async (req, res) => {
    const books = await Books.findById(req.params.id).populate("user");
    res.json(books);
  },

  deleteBooks: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.findById(id);

      if (books.user.toString() === req.user.id) {
        await books.remove();
        return res.json(books);
      }

      return res.status(401).json("Ошибка, нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка " + e.toString());
    }
  },

  createBooks: async (req, res) => {
    const { img, name, description, price } = req.body;

    try {
      const books = await Books.create({
        user: req.user.id,
        img,
        name,
        description,
        price,
      });
      return res.json(books);
    } catch (e) {
      return res.status(401).json("неверны тип токена");
    }
  },
  rendBook: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.findById(id);
      books.rend = {
        userRend: req.user.id,
        expires: 10,
      };
      await books.save();
      await res.json(books);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },

  rendReturnBook: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.findById(id);

      books.rend = null;
      await books.save();

      return await res.json(books);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },
};
