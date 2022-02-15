const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const upload = require("express-fileupload");

module.exports.userController = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },
  getUsersId: async (req, res) => {
    const user = await User.findById(req.user.id, { password: 0 });
    await res.json(user);
  },

  registerUser: async (req, res) => {
    try {
      const { img, login, password, wallet } = req.body;
      const hash = await bcrypt.hash(
        password.toString(),
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        img: img,
        login: login,
        password: hash,
        wallet: wallet,
      });
      if (!login) {
        return res.json({
          error: "login не найден",
        });
      }
      if (!password) {
        return res.json({
          error: "password не найден",
        });
      }
      await res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: "Ошибка при регистрации" + e.toString(),
      });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json({
        error: "Неверный данные (login)",
      });
    }

    const valid = await bcrypt.compare(password.toString(), candidate.password);
    if (!valid) {
      return res.status(401).json({
        error: "Неверный данные (password)",
      });
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });

    res.json({
      token: token,
    });
  },

  avatarAdd: async (req, res) => {
    const img = req.files.image;
    const fileName = `./image/${Math.random() * 10000} ${path.extname(
      img.name
    )}`;
    img.mv(fileName, async (err) => {
      if (err) {
        return res.status(401).json("ошибка при добавлении авы");
      } else {
        const user = await User.findById(req.user.id);
        user.img = fileName;
        user.save();
        await res.json({
          images: fileName,
          success: "ава выгружено",
        });
      }
    });
  },
};
