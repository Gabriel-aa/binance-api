import TradeOco from "../TradeOco";
import { TRADE_STATUS, TRADE_TYPES } from "../TradeTypes";

describe("Trade entity tests", () => {
  it("should be able to create a new Trade entity", () => {
    const trade = new TradeOco({
      coin: "ADAUSDT",
      price: 10,
      quantity: 1,
      stopPrice: 9,
      stopLimitPrice: 8,
    });

    expect(trade.getStatus()).toBe(TRADE_STATUS.PENDING);
    expect(trade.getCoin()).toBe("ADAUSDT");
    expect(typeof trade.getId()).toBe("string");
    expect(trade.getSide()).toBe("SELL");

    expect(trade.getPrice()).toBe(10);
    expect(trade.getQuantity()).toBe(1);
    expect(trade.getStopPrice()).toBe(9);
    expect(trade.getStopLimitPrice()).toBe(8);

    trade.setExchangeId("123");
    expect(trade.getExchangeId()).toBe("123");
  });

  it("should throw error if stop price is lower than stop limit price", () => {
    expect(() => {
      new TradeOco({
        coin: "ADAUSDT",
        price: 10,
        quantity: 1,
        stopPrice: 8,
        stopLimitPrice: 9,
      });
    }).toThrow("stopLimitPrice should be equal or lower than stopPrice");
  });
});
