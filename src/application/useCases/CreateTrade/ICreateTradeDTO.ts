import { TRADE_TYPES } from "../../entities/Trade/TradeTypes";

interface ICreateTradeDTO {
  coin: string;
  targets: number[];
  quantity: number;
  stop_price: number;
  stop_limit_price: number;
}

export default ICreateTradeDTO;
