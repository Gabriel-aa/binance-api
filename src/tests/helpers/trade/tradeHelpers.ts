import {
  TradeProps,
  TRADE_TYPES,
} from "../../../application/entities/Trade/TradeTypes";

const getRandomProps = (): TradeProps => {
  return {
    type: TRADE_TYPES.DAY_TRADE,
    coin: "ada/usdt",
    buyAt: 10,
    target1: 11,
    target2: 12,
    target3: 13,
    stopLoss: 9,
  };
};

export const getTradeProps = (props = {}): TradeProps => {
  return {
    ...getRandomProps(),
    ...props,
  };
};
