import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/:blogid?", async (req, res) => {
  const blogid = Number(req.params.blogid);

  try {
    if (blogid) {
      const [blog] = await db.blogs.one(blogid);
      res.json(blog);
    } else {
      const blogs = await db.blogs.all();
      res.json(blogs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks", error });
  }
});

router.post("/", async (req, res) => {
  const newBlog = req.body;
  newBlog.authorid = 1;
  try {
    const result = await db.blogs.insert(newBlog);
    res.json({ msg: "blog created", id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks", error });
  }
});

router.put("/:blogid", async (req, res) => {
  const blogid = Number(req.params.blogid);
  const editBlog = req.body;

  try {
    const result = await db.blogs.update(editBlog, blogid);
    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "my code sucks", error });
  }
});

router.delete("/:blogid", async (req, res) => {
    const blogid = Number(req.params.blogid);
  
    try {
      const result = await db.blogs.destroy(blogid);
      res.json({ msg: 'blog ${blogid} destroyed', affectedRows: result.affectedRows });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "my code sucks", error });
    }
  });

export default router;
