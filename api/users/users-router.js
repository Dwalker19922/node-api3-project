const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('../users/users-model')
const Post = require('../posts/posts-model')
// The middleware functions also need to be required
const { logger,validateUserId,validateUser,validatePost} = require('../middleware/middleware')

const router = express.Router();

router.get('/', logger, (req, res , next) => {
User.get()
.then((user) =>{
  res.json(user)
})
.catch(next)
});

router.get('/:id', logger, validateUserId, (req, res, next) => {
  User.getById(req.params.id)
  .then((user) =>{
    res.json(user)
  })
  .catch(next)
});

router.post('/', logger,validateUser,(req, res, next) => {
  User.insert(req.body)
   .then(user =>{
     res.json(user)
   })
   .catch((err)=>{
     next(err)
   })
});

 router.put('/:id', validateUser, logger,validateUserId,(req, res, next) => {
  User.update(req.params.id,req.body)
  .then((user)=>{
    const deletedUser={
      "id":Number(req.params.id),
      "name":req.body.name
    }
    res.json(deletedUser)
  })
.catch(next)
 })
 router.delete('/:id', logger, validateUserId ,(req, res,next) => {
 User.remove(req.params.id)
 .then(user=>{
 res.json(req.user)
 })
 .catch(next)
 });

router.get('/:id/posts', validateUserId, (req, res, next) => {
//   // RETURN THE ARRAY OF USER POSTS
User.getUserPosts(req.params.id)
.then((posts)=>{
res.json(posts)
})
.catch(next)
});

router.post('/:id/posts', logger,validateUserId,validatePost, (req, res,next) => {
 Post.insert(req.body)
.then((posts)=>{
res.json(posts)
})
.catch(next)
});

// do not forget to export the router
module.exports= router;