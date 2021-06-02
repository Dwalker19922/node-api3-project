const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  const time = Date.now()
  const date = new Date(time)
console.log(`Method: ${req.method} \n Path: ${req.path} \n Timestamp ${date} `)
next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("testing validatUserId")
  User.getById(req.params.id)
  .then(user =>{
    if(!user){
      res.status(404).json({message:"user not found"})
    }
    else{
      req.user = user
      console.log(req.user)
      next()
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  const {name} = req.body
  if(!name|| typeof name !== "string"|| name.trim().length<=2){
    next({
      message:"missing required name field",
      status:400
    })
  }
  else{
  req.user= {name:req.body.name.trim()}
  console.log(req.user)
  next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text,user_id}=req.body
  if(!text|| typeof text !== "string"||text.trim().length<=2){
    next({
      message:"missing required text field",
      status:400
    })
  }
else {
  req.user={text:req.body.text.trim()}
  next()

}
}
// do not forget to expose these functions to other modules
module.exports ={
  logger,
  validateUserId,
  validateUser,
  validatePost
}