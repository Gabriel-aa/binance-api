import Trade from "../../../../application/entities/Trade/Trade";
import { getTradeProps } from "../../../../tests/helpers/trade/tradeHelpers";
// import BinanceWalletService from "../../services/Trade/BinanceWalletService";
import BinanceTrade from "../BinanceTrade";

// jest.mock("../../services/Trade/BinanceWalletService", () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       getStatus: () => {
//         return {
//           headers: { date: "Fri, 09 Jul 2021 17:52:24 GMT" },
//         };
//       },
//     };
//   });
// });

describe("Tests BinanceTrades class", () => {
  it("should be able to calculate the difference between binance date and the server date and only once", async () => {
    const binanceTrade = new BinanceTrade();
    const trade = new Trade(getTradeProps());

    await binanceTrade.create(trade);
  });
});
