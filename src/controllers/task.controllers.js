const pool = require("../db");

const getAllTask = async (req, res) => {
  try {
    const allTask = await pool.query("SELECT * FROM task");
    res.json(allTask.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const getOneTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Tarea no encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO task (title,description) VALUES ($1,$2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const result = await pool.query(
    "DELETE FROM task WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0)
    return res.status(404).json({
      message: "tarea no encontrada, no se puede eliminar",
    });

  return res.sendStatus(204);
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const result = await pool.query(
      "UPDATE task SET title = $1, description= $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No existe tal tarea",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllTask,
  createTask,
  getOneTask,
  deleteTask,
  updateTask,
};
