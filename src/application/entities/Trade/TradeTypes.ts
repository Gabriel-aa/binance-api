export enum TRADE_STATUS {
  PENDING = "PENDING",
  EXECUTED = "EXECUTED",
  CANCELED = "CANCELED",
  FAILED = "FAILED",
}

export enum TRADE_TYPES {
  DAY_TRADE = "DAY_TRADE",
  SWING_TRADE = "SWING_TRADE",
}

export enum TRADE_SIDE {
  BUY = "BUY",
  SELL = "SELL",
}

export type TradeProps = {
  coin: string;
};

export type TradeOcoProps = TradeProps & {
  price: number;
  quantity: number;
  stopPrice: number;
  stopLimitPrice: number;
};
