//b/c we're accessing database, we need to bring in the right model
const User = require('../users/users-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`
  [${timeStamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
 try {
  const user = await User.getById(req.params.id)
  if (!user) {
    next({ status: 404, message: 'user not found' })
    return
  } else {
    req.user = user
    next()
  }
 } catch (err) {
    next(err)
 }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  if (!name || !name.trim()) {
    res.status(400).json({
      message: `missing required name field`,
    })
  } else {
    req.name = name.trim()
    next()
  }
}
 

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if (!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}