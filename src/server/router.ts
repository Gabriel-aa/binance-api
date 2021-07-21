import { Request, Response } from "express";
import CreateTradeController from "../application/useCases/CreateTrade/CreateTradeController";
import CreateTradeUseCase from "../application/useCases/CreateTrade/CreateTradeUseCase";
import BinanceCoinInfo from "../exchanges/binance/coin/BinanceCoinInfo";
import BinanceTrade from "../exchanges/binance/trade/BinanceTrade";
import TradeRepository from "../repositories/mysql/TradeRepository";

const express = require("express");
const router = express.Router();

router.post("/trade", async (req: Request, res: Response) => {
  const repository = new TradeRepository();
  const exchange = new BinanceTrade();
  const coinInfo = new BinanceCoinInfo();
  const useCase = new CreateTradeUseCase(repository, exchange, coinInfo);
  const controller = new CreateTradeController(useCase);

  await controller.handle(req, res);

  res.status(200).send();
});

export default router;
