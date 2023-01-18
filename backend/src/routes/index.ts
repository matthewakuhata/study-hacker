import express, { Request, Response, NextFunction } from "express";
import TaskRouter from './tasks.router'

const api = express();
const routes = express.Router();

api.use(express.json());

routes.use("/tasks", TaskRouter);
// routes.use("/classroom", classroomRouter);
// routes.use("/car", carRouter);

/**
 * Unknown API routes handling
 */
// routes.use((req, res, next) => {
//   throw new HttpError(`Unkown path ${req.method} ${req.path}`, 404);
// });

/**
 * Error Handling
 */
// routes.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
//   if (!error.code || !error.message) {
//     error = new HttpError(error.message, error.code);
//   }

//   if (res.headersSent) {
//     return next(error);
//   }

//   res.status(error.code);
//   res.json({ message: error.message });
// });

api.use(routes);

export default api;