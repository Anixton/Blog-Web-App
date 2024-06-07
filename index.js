import express from "express";
import fs from "fs";
import body from "body-parser";

const currentYear = new Date().getFullYear();
const app = express();
const port = 3000;
app.use(express.static("public"));

var post = JSON.parse(fs.readFileSync("data.json"));

app.use(body.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { year: currentYear });
});

app.post("/", (req, res) => {
  var newdata = {
    id: parseInt(req.body.id),
    category: req.body.category,
    title: req.body.title,
    auther: req.body.author,
    content: req.body.content,
  };
  post.push(newdata);
  fs.writeFileSync("data.json", JSON.stringify(post));
  res.render("allpost.ejs", { post: post, year: currentYear });
});

app.get("/view/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const postViewing = post.find((post) => post.id === postId);
  if (!postViewing) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("viewpost.ejs", { viewPost: postViewing, year: currentYear });
});

app.get("/posts", (req, res) => {
  res.render("allpost.ejs", { post: post, year: currentYear });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { year: currentYear });
});

app.get("/create", (req, res) => {
  res.render("newPost.ejs", { year: currentYear });
});
app.listen(port, () => {
  console.log("server running on: " + port);
});
