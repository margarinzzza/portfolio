const Post = require('./models/Post.js')

class postController {
    async createPost(req, res) {
        try {
            const data = req.body
            const post = new Post(data)
            await post.save()
            return res.status(200).json({ message: 'post created' })
        } catch (err) {
            console.log(err)
            res.status(400).json({ message: 'post create failed' })
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find()
            return res.status(200).json({ posts })
        } catch (err) {
            console.log(err)
        }
    } 
 
    async getMyPosts(req, res) {
        try {
            const {userId} = req.body
            const posts = await Post.find({userId: userId})
            return res.status(200).json({ posts })
        } catch (err) {
            console.log(err)
        }
    } 

    async deletePost(req, res) {
        try {
            const { postId } = req.body
            await Post.findByIdAndRemove(postId)
            return res.status(200).json({ message: 'success delete' })
        } catch (err) {
            console.log(err)
        }
    }


}

module.exports = new postController()