const express = require('express');

const {getAllPosts,verifyToken, createPost, editPost, deletePost} = require('../controllers/postController.js')

const router = express.Router()



router.get('/', getAllPosts)
router.post('/',verifyToken, createPost)
router.put('/:postId',verifyToken, editPost)
router.delete('/:postId',verifyToken, deletePost)


module.exports = router;