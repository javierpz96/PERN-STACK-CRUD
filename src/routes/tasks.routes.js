const { Router } = require("express");
const {
  getAllTask,
  createTask,
  getOneTask,
  deleteTask,
  updateTask,
} = require("../controllers/task.controllers");

const router = Router();

router.get("/tasks", getAllTask);

router.post("/task", createTask);

router.get("/task/:id", getOneTask);

router.delete("/task/:id", deleteTask);

router.put("/task/:id", updateTask);

module.exports = router;
