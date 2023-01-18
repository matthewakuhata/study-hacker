import http from "http";
import express, { Express } from "express";
import mongoose from "mongoose";
import api from "./routes";
import dotenv from "dotenv";

dotenv.config();
const server: Express = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "origin, X-Requested-With,Content-Type,Accept, Authorization"
   );
   if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
      return res.status(200).json({});
   }
   next();
});

/**
 * API Version 1
 */
server.use("/api/v1/", api);

const httpServer = http.createServer(server);

mongoose
   .connect(process.env.MONGO_API_CONNECT || "")
   .then(() => {
      console.log("Connected to MongoDB");

      const PORT: any = process.env.PORT || 3001;
      httpServer.listen(PORT, () =>
         console.log(`The server is running on port ${PORT}`)
      );
   })
   .catch((error) => {
      console.log(error);
   });