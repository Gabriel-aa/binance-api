import { countDecimals } from "../../../helpers/numberHelper";
import TradeOco from "../../entities/Trade/TradeOco";
import IExchangeCoinInfo, {
  QuantityEdgesType,
} from "../../modules/exchanges/IExchangeCoinInfo";
import IExchangeTrade from "../../modules/exchanges/IExchangeTrade";
import ITradeRepository from "../../modules/repositories/ITradeRepository";
import ICreateTradeDTO from "./ICreateTradeDTO";

const DEFAULT_DISIVION = [0.5, 0.25, 0.25];

class CreateTradeUseCase {
  private response: string[] = [];
  private index = 0;

  constructor(
    private tradeRepository: ITradeRepository,
    private exchangeTrade: IExchangeTrade,
    private exchangeCoinInfo: IExchangeCoinInfo
  ) {}

  async execute(data: ICreateTradeDTO): Promise<void> {
    const trades = await this.createByTargets(data);

    for (let i = 0; i < trades.length; i++) {
      this.response[i] = await this.makeOcoTrade(trades[i]);
    }
  }

  async makeOcoTrade(trade: TradeOco) {
    const { id: exchangeId } = await this.exchangeTrade.create(trade);
    trade.setExchangeId(exchangeId);
    await this.tradeRepository.save(trade);

    return exchangeId;
  }

  async createByTargets(data: ICreateTradeDTO): Promise<TradeOco[]> {
    let trades: TradeOco[] = [];
    const quantityEdge = await this.exchangeCoinInfo.getQuantityEdges(
      data.coin
    );

    data.targets.forEach((target) => {
      trades.push(
        new TradeOco({
          coin: data.coin,
          price: target,
          quantity: this.getFormattedQuantity(data.quantity, quantityEdge),
          stopPrice: data.stop_price,
          stopLimitPrice: data.stop_limit_price,
        })
      );
    });

    return trades;
  }

  getFormattedQuantity(
    quantity: number,
    quantityEdge: QuantityEdgesType
  ): number {
    let formattedQuantity = quantity * DEFAULT_DISIVION[this.index++];
    const decimals = countDecimals(formattedQuantity);

    if (decimals > quantityEdge.maxDecimals) {
      formattedQuantity = Number(
        formattedQuantity.toFixed(quantityEdge.maxDecimals)
      );
    }

    return formattedQuantity;
  }
}

export default CreateTradeUseCase;
