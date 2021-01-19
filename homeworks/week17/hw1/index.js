//express
const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const db = require('./models')
const User = db.User
const Blog = db.Blog

const blogController = require('./controller/blog')
const userController = require('./controller/user')

app.set('view engine', 'ejs')
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

//express body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express session flash
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.use(express.static(__dirname + '/public'));

function redirectBack(req, res, next) {
  res.redirect('back')
}

app.get('/', blogController.index)
app.get('/admin', blogController.admin)
app.get('/blog/:id', blogController.blog)
app.get('/login', userController.login)
app.post('/handle_login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/handle_register', userController.handleRegister)
app.get('/add', blogController.add)
app.post('/handle_add', blogController.handleAdd, redirectBack)
app.get('/update_blog/:id', blogController.updateBlog)
app.post('/handle_update_blog/:id', blogController.handleUpdateBlog, redirectBack)
app.get('/delete_blog/:id', blogController.deleteBlog)