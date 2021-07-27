import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import router from "./router";
import ValidationError from "../errors/ValidationError";
import ErrorHandler from "./middlewares/ErrorHandler";

const app = express();
dotenv.config();

app.use(express.json());

app.use(router);

app.use(ErrorHandler);

export default app;
