import { mock } from "jest-mock-extended";
import IExtendTrade from "../../../modules/exchanges/IExchangeTrade";
import ITradeRepository from "../../../modules/repositories/ITradeRepository";
import CreateTradeUseCase from "../CreateTradeUseCase";
import ICreateTradeDTO from "../ICreateTradeDTO";

describe("Test for CreateTradeUseCase class", () => {
  it("should call save method from repository", async () => {
    const tradeRepository = mock<ITradeRepository>();
    const exchangeTrade = mock<IExtendTrade>();
    exchangeTrade.create.mockResolvedValue({ id: "1" });
    const data = mock<ICreateTradeDTO>();
    const createTradeUseCase = new CreateTradeUseCase(
      tradeRepository,
      exchangeTrade
    );

    await createTradeUseCase.execute(data);

    expect(exchangeTrade.create).toHaveBeenCalledTimes(1);
    expect(tradeRepository.save).toHaveBeenCalledTimes(1);
  });
});
