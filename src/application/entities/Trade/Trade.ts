import { v4 as uuidv4 } from "uuid";
import { TradeProps, TRADE_STATUS, TRADE_SIDE } from "./TradeTypes";

class Trade {
  private id: string;
  private status: TRADE_STATUS;
  private coin!: string;
  private exchangeId!: string;
  private side!: TRADE_SIDE;

  constructor(props: TradeProps) {
    this.id = uuidv4();
    this.status = TRADE_STATUS.PENDING;
    this.side = TRADE_SIDE.SELL;

    Object.assign(this, props);
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }

  getCoin() {
    return this.coin;
  }

  getExchangeId() {
    return this.exchangeId;
  }

  getSide() {
    return this.side;
  }

  setExchangeId(exchangeId: string) {
    this.exchangeId = exchangeId;
  }
}

export default Trade;
