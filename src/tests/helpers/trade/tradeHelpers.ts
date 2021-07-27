import { TradeOcoProps } from "../../../application/entities/Trade/TradeTypes";

const getRandomProps = (): TradeOcoProps => {
  return {
    coin: "ADAUSDT",
    price: 10,
    quantity: 1,
    stopPrice: 9,
    stopLimitPrice: 8,
  };
};

export const getTradeProps = (props = {}): TradeOcoProps => {
  return {
    ...getRandomProps(),
    ...props,
  };
};
