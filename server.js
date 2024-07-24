import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

// Posts array:
let posts = [
    {
     id: 1,
     date: "2014-06-05",
     title: "About Dogs",
     content: "Dogs are about as smart as a two or three-year-old child.",
     author: "unknown",
    },
    {
     id: 2,
     date: "2014-06-04",
     title: "About Elephants",
     content: "An elephant can smell water up to 3 miles away.",
     author: "unknown",
    },
    {
     id: 3,
     date: "2014-06-03",
     title: "About rabbits",
     content: "Rabbits can hear sounds as far as two miles away.",
     author: "unknown",
    },
    {
     id: 4,
     date: "2014-06-02",
     title: "About Crows",
     content: "Cows have one large stomach that is divided into four compartments to go through the different stages of digestion.",
     author: "unknown",
    },
    {
     id: 5,
     date: "2014-06-01",
     title: "About Kangaroo",
     content: "Kangaroos cannot walk backward.",
     author: "unknown",
    }
];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  const newPost = {
    id: posts.length + 1,
    date: new Date().toISOString().split('T')[0],
    title,
    content,
    author
  };
  posts.push(newPost);
  res.redirect("/");
});

app.put("/posts/:id", (req, res) => {
    const { title, content, author } = req.body;
    const post = posts.find(post => post.id == req.params.id);
    post.title = title;
    post.content = content;
    post.author = author;
    res.redirect("/");
});

app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });