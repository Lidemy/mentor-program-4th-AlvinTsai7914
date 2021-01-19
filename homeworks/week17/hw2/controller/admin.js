const db = require('../models');
const Lottery = db.Lottery
const User = db.User

const adminController = {
  login: (req, res) => {
    if (req.session.username === 'admin') {
      Lottery.findAll(

      ).then(prizes => {
        res.render('../views/admin', { prizes })
      })
    } else {
      res.render('../views/login')
    }

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
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '帳號或密碼錯誤')
        return next()
      } else if (user.password === password) {
        req.session.username = user.username
        req.session.userId = user.id
        res.redirect('/admin')
      }
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  prizeAdd: (req, res, next) => {
    var { prize, pic, weight } = req.body
    if (!prize || !pic || !weight) {
      req.flash('errorMessage', '請填入資料')
      return next()
    } else if (req.session.username !== 'admin') {
      req.flash('errorMessage', '權限不足')
      return next()
    } else {
      Lottery.create({
        prize, pic, weight
      }).then(() => {
        res.redirect('/admin')
      }).catch(err => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    }
  },
  prizeDelete: (req, res, next) => {
    var id = req.params.id
    if (req.session.username !== 'admin') {
      req.flash('errorMessage', '權限不足')
      return next()
    }
    Lottery.destroy({
      where: {
        id
      }
    }).then(() => {
      res.redirect('/admin')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  prizeUpdate: (req, res) => {
    var id = req.params.id
    Lottery.findOne({
      where: {
        id
      }
    }).then(prize => {
      res.render('../views/prize_update', { prize })
    })
  },
  handlePrizeUpdate: (req, res, next) => {
    var id = req.params.id
    var { prize, pic, weight } = req.body
    if (!prize || !pic || !weight) {
      req.flash('errorMessage', '請填入資料')
      return next()
    }
    if (req.session.username !== 'admin') {
      req.flash('errorMessage', '權限不足')
      return next()
    } else {
      Lottery.findOne({
        where: {
          id
        }
      }).then(prizeToUpdate => {
        return prizeToUpdate.update({
          prize,
          pic,
          weight
        })
      }).then(() => {
        res.redirect('/admin')
      }).catch(err => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    }
  }
}

module.exports = adminController

