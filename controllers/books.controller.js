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
  deleteBooks: async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.findById(id);

      if (books.user.toString() === req.user.id) {
        await books.remove();

        return res.json("удалено");
      }

      return res.status(401).json("Ошибка, нет доступа");
    } catch (e) {
      return res.status(401).json("Ошибка " + e.toString());
    }
  },

  createBooks: async (req, res) => {
    const { img, name, description } = req.body;

    try {
      const books = await Books.create({
        user: req.user.id,
        img,
        name,
        description,
      });
      return res.json(books);
    } catch (e) {
      return res.status(401).json("неверны тип токена");
    }
  },
  rendBook: async (req, res) => {
    const { id } = req.params;

    // get the book by id
    // book.rend = {
    // userRend: ...,
    // exp
    // save()

    if (authorization) {
      try {
        const books = await Books.findById({ id });
        Books.rend = {
          userRender: req.params.id,
          expires,
        };
        await books.save();
        return res.json(books);
      } catch (e) {
        return res.status(401).json("неверны тип токена");
      }
    }
  },
};
