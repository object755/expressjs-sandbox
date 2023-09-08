import PostService from "./PostService.js";

class PostController {
  async create(req, res) {
    try {
      // console.log(req.files?.picture);
      const post = await PostService.create(req.body);
      console.log(req.body);
      res.json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await PostService.update(req.body);
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async searchByName(req, res) {
    try {
      const { fullName } = req.query;
      if (!fullName) {
        return res
          .status(400)
          .json({ error: "Name parameter is required for searching." });
      }

      const posts = await PostService.searchByName(fullName);
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
