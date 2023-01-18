import { Request, Response, NextFunction } from "express";

function CreateTask(req: Request, res: Response, next: NextFunction) {
   res.status(200).json([]);
}

function UpdateTask(req: Request, res: Response, next: NextFunction) {
   res.status(200).json([]);
}

function GetAllTasks(req: Request, res: Response, next: NextFunction) {
   res.status(200).json([]);
}

export default { CreateTask, UpdateTask, GetAllTasks };