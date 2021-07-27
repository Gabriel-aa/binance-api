import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import router from "./router";
import ValidationError from "../errors/ValidationError";

const app = express();
dotenv.config();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ err: err.message });
  }

  return res.status(500).send({ err: err.message });
});

export default app;
