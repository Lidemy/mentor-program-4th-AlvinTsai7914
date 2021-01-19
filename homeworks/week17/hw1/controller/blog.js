const db = require('../models')
const User = db.User
const Blog = db.Blog

const blogController = {
  index: (req, res) => {
    Blog.findAll({
      include: User,
      order: [['updatedAt', 'DESC']]
    }).then((blogs) => {
      res.render('index', { blogs })
    })
  },

  admin: (req, res) => {
    Blog.findAll({
      include: User,
      order: [['updatedAt', 'DESC']]
    }).then(blogs => {
      res.render('blog/admin', { blogs })
    })
  },

  blog: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id
      }
    }).then(blog => {
      console.log(JSON.stringify(blog, null, 4))
      res.render('blog/blog', { blog })
    })
  },

  add: (req, res) => {
    res.render('blog/add')
  },

  handleAdd: (req, res, next) => {
    const { title, content } = req.body
    var { userId } = req.session
    if (!title || !content) {
      req.flash('errorMessage', '請填入標題與文章')
      return next()
    }
    Blog.create({
      title,
      content,
      UserId: userId,
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  updateBlog: (req, res) => {
    Blog.findOne({
      where: {
        id: req.params.id
      }
    }).then((blog) => {
      res.render('blog/update_blog', { blog })
    })
  },

  handleUpdateBlog: (req, res, next) => {
    var { title, content } = req.body
    if (!title || !content) {
      req.flash('errorMessage', '請填入標題與文章')
      return next()
    }
    Blog.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then((blog) => {
      return blog.update({
        title,
        content
      })
    }).then(() => {
      res.redirect('/')
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      res.redirect('/')
    })
  },

  deleteBlog: (req, res) => {
    Blog.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(() => {
      res.redirect('/')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      res.redirect('/')
    })
  },
}

module.exports = blogController