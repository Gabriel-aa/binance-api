import TradeOco from "../../../../application/entities/Trade/TradeOco";
import { getTradeProps } from "../../../../tests/helpers/trade/tradeHelpers";
import BinanceTrade from "../BinanceTrade";

jest.mock("../../BinanceRequestMaker", () => {
  return jest.fn().mockImplementation(() => {
    return {
      request: () => {
        return {
          data: { orderListId: "123" },
        };
      },
    };
  });
});

describe("Tests BinanceTrades class", () => {
  it("should be able to calculate the difference between binance date and the server date and only once", async () => {
    const binanceTrade = new BinanceTrade();
    const trade = new TradeOco(getTradeProps());

    await binanceTrade.create(trade).then((res) => {
      expect(res).toEqual({ id: "123" });
    });
  });
});
