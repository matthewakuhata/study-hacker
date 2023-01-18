import express from "express";
import TasksController from "../controllers/tasks.controller";

const router = express.Router();

/**
 * Get All tasks
 */
router.get("/", TasksController.GetAllTasks);

/**
 * Create Task
 */
router.post("/", TasksController.CreateTask);

/**
 * Update task by id
 */
router.put("/:id", TasksController.UpdateTask);

export default router;