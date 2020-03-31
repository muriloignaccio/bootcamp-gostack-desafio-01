const express = require("express");

const app = express();

app.use(express.json());

const projects = [
  {
    "id": "0",
    "title": "buceta",
    "tasks": []
  },
  {
    "id": "1",
    "title": "buceta",
    "tasks": []
  }
];


const countRequestsMade = (req, res, next) => {
  console.count(`Number of requests`);
  return next();
};

const checkProjectExistance = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found"});
  }
  
  return next();
};

app.use(countRequestsMade);

app.get("/projects", (req, res) => {
  res.json(projects);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: []});

  return res.json(projects);
});

app.put("/projects/:id", checkProjectExistance, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
});

app.delete("/projects/:id", checkProjectExistance, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

app.post("/projects/:id/tasks", checkProjectExistance, (req, res) => {
  const { id }= req.params;
  const { title } = req.body;

  const projectFound = projects.find(p => p.id == id);
  
  projectFound.tasks.push(title);

  return res.json(projects)

});

app.listen(3000);