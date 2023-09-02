import Post from './Post.js';
import mongoose from 'mongoose';

class PostService {
    async create(post, picture) {
        // const fileName = FileService.saveFile(picture);
        const createdPost = await Post.create(post)
        return createdPost;
    }

    async getAll() {
        const posts = await Post.find();
        return posts
    }

    async getOne(id) {
        if (!id) throw new Error('id does not exist');
        const post = await Post.findById(id);
        return post;
    }

    async update(post) {
        if (!post._id) throw new Error('id does not exist');
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true});
        return updatedPost;
    }

    async delete(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid id');
        }

        const post = await Post.findByIdAndDelete(id);
        return post;
    }
}

export default new PostService();