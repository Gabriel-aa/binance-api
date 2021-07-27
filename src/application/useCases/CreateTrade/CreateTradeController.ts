import { NextFunction, Request, Response } from "express";
import CreateTradeUseCase from "./CreateTradeUseCase";

class CreateTradeController {
  constructor(private createTradeUseCase: CreateTradeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { coin, targets, quantity, stop_price, stop_limit_price } = req.body;

    try {
      await this.createTradeUseCase.execute({
        coin,
        targets,
        quantity,
        stop_price,
        stop_limit_price,
      });

      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }
}

export default CreateTradeController;
