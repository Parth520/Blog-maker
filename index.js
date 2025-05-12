import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(
    import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname);

let blogPosts = [];

app.get("/", (req, res) => {
    res.render("homepage", { blogPosts });
});

app.post("/submit", (req, res) => {
    res.render("submit");
});

app.post("/render", (req, res) => {
    const name = req.body.name;
    const topic = req.body.Topic;
    const message = req.body.message;

    blogPosts.push({ name, topic, message });

    res.redirect("/");
});

app.post("/Topic", (req, res) => {
    const index = req.body.index;
    const post = blogPosts[index];
    if (post) {
        res.render("blog", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
