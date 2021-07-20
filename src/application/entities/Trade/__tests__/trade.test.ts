import Trade from "../Trade";
import { TRADE_STATUS, TRADE_TYPES } from "../TradeTypes";

describe("Trade entity tests", () => {
  it("should be able to create a new Trade entity", () => {
    const trade = new Trade({
      type: TRADE_TYPES.DAY_TRADE,
      coin: "ada/usdt",
      buyAt: 10,
      target1: 11,
      target2: 12,
      target3: 13,
      stopLoss: 9,
    });

    expect(trade.getStatus()).toBe(TRADE_STATUS.PENDING);
    expect(trade.getBuyAt()).toBe(10);
    expect(trade.getTarget1()).toBe(11);
    expect(trade.getTarget2()).toBe(12);
    expect(trade.getTarget3()).toBe(13);
    expect(trade.getStopLoss()).toBe(9);
    expect(trade.getCoin()).toBe("ada/usdt");
    expect(trade.getType()).toBe(TRADE_TYPES.DAY_TRADE);
    expect(typeof trade.getId()).toBe("string");

    trade.setExchangeId("123");
    expect(trade.getExchangeId()).toBe("123");
  });
});
