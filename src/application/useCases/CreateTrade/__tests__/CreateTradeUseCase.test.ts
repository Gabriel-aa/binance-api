import { mock } from "jest-mock-extended";
import IExchangeCoinInfo from "../../../modules/exchanges/IExchangeCoinInfo";
import IExtendTrade from "../../../modules/exchanges/IExchangeTrade";
import ITradeRepository from "../../../modules/repositories/ITradeRepository";
import CreateTradeUseCase from "../CreateTradeUseCase";

describe("Test for CreateTradeUseCase class", () => {
  it("should call save method from repository", async () => {
    const tradeRepository = mock<ITradeRepository>();
    const exchangeTrade = mock<IExtendTrade>();
    const exchangeCoinInfo = mock<IExchangeCoinInfo>();
    exchangeTrade.create.mockResolvedValue({ id: "1" });

    exchangeCoinInfo.getQuantityEdges.mockResolvedValue({
      maxNumber: 2,
      maxDecimals: 2,
    });

    const data = {
      coin: "ADAUSDT",
      targets: [1, 2, 3],
      quantity: 1,
      stop_price: 2,
      stop_limit_price: 1,
    };

    const createTradeUseCase = new CreateTradeUseCase(
      tradeRepository,
      exchangeTrade,
      exchangeCoinInfo
    );

    await createTradeUseCase.execute(data);

    expect(exchangeTrade.create).toHaveBeenCalledTimes(3);
    expect(tradeRepository.save).toHaveBeenCalledTimes(3);
  });
});
