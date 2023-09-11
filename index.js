import express from "express";

const app = express();
const port = 3000;

let homeTasks = [];
let workTasks = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { homeTasks: homeTasks, listType: "home" });
});

app.get("/work", (req, res) => {
  res.render("index", { workTasks: workTasks, listType: "work" });
});

app.post("/submit", (req, res) => {
  const newTask = req.body.newTask;
  const listType = req.body.listType;

  if (newTask && listType === "home") {
    homeTasks.push(newTask);
    res.redirect("/");
  } else if (newTask && listType === "work") {
    workTasks.push(newTask);
    res.redirect("/work");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
