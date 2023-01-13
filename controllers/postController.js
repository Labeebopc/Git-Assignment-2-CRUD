const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const { PostSchema } = require("../models/postModel.js")



const Post = mongoose.model('Post', PostSchema)

const getAllPosts = async(req,res)=>{
    try {
        const allPosts = await Post.find()

        res.status(200).json({success: true, allPosts, message: "Fetched All Posts" })
    } 
    catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const verifyToken = (req, res, next)=>{

     const headers = req.headers.authorization
     //console.log(headers);
     const token = headers.replace('Bearer ', '')

     if (!token) {
         return res.status(404).json({ success: false, message: "No Token Found / User is Not Authenticated" })
     }
 
     //jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
     jwt.verify(token, "RESTAPISECRETKEY", (err, result) => {
         if (err) {
             return res.status(400).json({ success: false, message: "Invalid Token" })
         }
 
         console.log(result);
         req.user = result.id;
 
     })
     next();
}

const createPost = async(req,res)=>{
    const {title, body, image} = req.body;
    const user = req.user
    try {
        const post = await Post.create({title, body, image, user})

        res.status(201).json({success: true, post, message: "Post Successfully Created" })
    } 
    catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

const editPost = async(req,res)=>{
   
    const postId = req.params.postId;
    let post;
    try {
        post = await Post.updateOne({ _id: postId }, req.body)
        //post = await Post.findOne({ _id: postId })

    } catch (error) {
        return res.status(400).json({ success: false })

    }
    return res.status(200).json({ success: true, post, message: "Post Successfully Updated" })

}

const deletePost = async(req,res)=>{
    const postId = req.params.postId;
    let post;
    try {
        post = await Post.deleteOne({ _id: postId })

    } catch (error) {
        return res.status(400).json({ success: false })

    }

    return res.status(200).json({ success: true, message: "Post Deleted Successfully" })
}

module.exports = {getAllPosts , verifyToken, createPost, editPost, deletePost}