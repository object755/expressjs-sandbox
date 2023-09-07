import Post from "./Post.js";

class PostService {
  async create(post, picture) {
    // const fileName = FileService.saveFile(picture);
    const createdPost = await Post.create(post);
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }

  async getOne(id) {
    if (!id) throw new Error("id does not exist");
    const post = await Post.findById(id);
    return post;
  }

  async update(post) {
    if (!post._id) throw new Error("id does not exist");
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Invalid id");
    }

    const post = await Post.findByIdAndDelete(id);
    return post;
  }

  async searchByName(fullName) {
    try {
      const regex = new RegExp(fullName, "i");
      const posts = await Post.find({ fullName: { $regex: regex } });
      return posts;
    } catch (e) {
      throw e;
    }
  }
}

export default new PostService();
