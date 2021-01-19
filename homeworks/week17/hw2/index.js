const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const indexController = require('./controller/index')
const adminController = require('./controller/admin')
const session = require('express-session')
const bodyParser = require('body-parser')
var flash = require('connect-flash');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res, next) {
  res.redirect('back')
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', indexController.index)
app.get('/lottery', indexController.lottery)
app.get('/handle_lottery', indexController.handleLottery)

app.get('/admin', adminController.login, redirectBack)
app.post('/handle_login', adminController.handleLogin, redirectBack)

app.post('/prize_add', adminController.prizeAdd, redirectBack)

app.get('/prize_delete/:id', adminController.prizeDelete, redirectBack)
app.get('/prize_update/:id', adminController.prizeUpdate)
app.post('/prize_update/:id', adminController.handlePrizeUpdate, redirectBack)