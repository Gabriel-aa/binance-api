import { Request, Response } from "express";
import { TRADE_TYPES } from "../../entities/Trade/TradeTypes";
import CreateTradeUseCase from "./CreateTradeUseCase";

class CreateTradeController {
  constructor(private createTradeUseCase: CreateTradeUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { coin, targets, quantity, stop_price, stop_limit_price } = req.body;

    try {
      await this.createTradeUseCase.execute({
        coin,
        targets,
        quantity,
        stop_price,
        stop_limit_price,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send();
    }
  }
}

export default CreateTradeController;
