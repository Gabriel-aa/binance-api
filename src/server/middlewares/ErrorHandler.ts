import { NextFunction, Request, Response } from "express";
import ValidationError from "../../errors/ValidationError";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).send({ err: err.message });
  }

  return res.status(500).send({ err: err.message });
};
