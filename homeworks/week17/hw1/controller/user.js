const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../models');
const User = db.User
const Blog = db.Blog

const userController = {
  login: (req, res) => {
    res.render('user/login')
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '請填入帳號密碼')
      return next()
    }

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      } else if (user.admin !== true) {
        console.log(JSON.stringify(user, null, 4))
        req.flash('errorMessage', '使用者無權限登入')
        return next()
      }
      bcrypt.compare(password, user.password, function (err, isSussess) {
        if (err || !isSussess) {
          req.flash('errorMessage', '帳號或密碼錯誤')
          return next()
        }
        req.session.username = user.username
        req.session.userId = user.id
        res.redirect('/')
      });
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  logout: (req, res) => {
    req.session.username = null
    req.session.userId = null
    res.redirect('/')
  },

  register: (req, res) => {
    res.render('user/register')
  },

  handleRegister: (req, res, next) => {
    const { username, password, nickname } = req.body
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位')
      return res.redirect('back')
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
      User.create({
        username,
        nickname,
        password: hash
      }).then(() => {
        res.redirect('/')
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      })
    })
  }
}

module.exports = userController