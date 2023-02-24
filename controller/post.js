const {
  getPosts,
  createPost,
  editPost,
  findPostById,
  deletePost,
} = require("../database");
const { formatDate } = require("../utils/format");

async function getPostsCntrl(req, res) {
  try {
    const posts = await getPosts();
    res.status(200).json({ data: posts });
  } catch (error) {
    console.log("error finding posts: " + error);
  }
}

async function createPostCntrl(req, res) {
  try {
    const data = {
      creator: req.userId,
      description: req.body.description,
      title: req.body.title,
      category: req.body.category,
      created_at: formatDate(),
    };
    await createPost(data);
    res.status(200).json({ message: "post created successfully" });
  } catch (error) {
    console.log("error creating a post: " + error);
  }
}

async function editPostCntrl(req, res) {
  try {
    if (req.userId != req.body.creator)
      res.status(403).json({ message: "forbidden" });

    const message = await editPost(req.data, req.body.post_id);
    res.status(200).json({ message });
  } catch (error) {
    console.log("error editing a post: " + error);
  }
}

async function deletePostCntrl(req, res) {
  try {
    console.log("post_id" + req.body.post_id);
    const post = await findPostById(req.body.post_id);

    if (!post) return res.status(400).json({ message: "no post found" });
    if (req.userId != post.creator)
      return res.status(403).json({ message: "forbidden" });

    const message = await deletePost(req.body.post_id);
    res.status(200).json({ message });
  } catch (error) {
    console.log("error deleting a post: " + error);
  }
}

module.exports = {
  getPostsCntrl,
  createPostCntrl,
  editPostCntrl,
  deletePostCntrl,
};
