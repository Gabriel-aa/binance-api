import Trade from "../Trade";
import { TRADE_STATUS, TRADE_TYPES } from "../TradeTypes";

describe("Trade entity tests", () => {
  it("should be able to create a new Trade entity", () => {
    const trade = new Trade({
      coin: "ADAUSDT",
    });

    expect(trade.getStatus()).toBe(TRADE_STATUS.PENDING);
    expect(trade.getCoin()).toBe("ADAUSDT");
    expect(typeof trade.getId()).toBe("string");
    expect(trade.getSide()).toBe("SELL");

    trade.setExchangeId("123");
    expect(trade.getExchangeId()).toBe("123");
  });
});
