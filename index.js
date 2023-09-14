import express from "express";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  session({
    secret: "someSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);

let homeTasks = [];
let workTasks = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  req.session.homeTasks = req.session.homeTasks || [];
  res.render("index", { homeTasks: req.session.homeTasks, listType: "home" });
});

app.get("/work", (req, res) => {
  req.session.workTasks = req.session.workTasks || [];
  res.render("index", { workTasks: req.session.workTasks, listType: "work" });
});

app.post("/submit", (req, res) => {
  const newTask = req.body.newTask;
  const listType = req.body.listType;

  if (newTask && listType === "home") {
    req.session.homeTasks.push(newTask);
    res.redirect("/");
  } else if (newTask && listType === "work") {
    req.session.workTasks.push(newTask);
    res.redirect("/work");
  } else {
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
