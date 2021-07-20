import TradeOco from "../../../application/entities/Trade/TradeOco";
import IExtendTrade from "../../../application/modules/exchanges/IExchangeTrade";
import BinanceRequestMaker from "../BinanceRequestMaker";
import { MethodType } from "../types";

class BinanceTrade implements IExtendTrade {
  private binanceRequestMaker;

  constructor() {
    this.binanceRequestMaker = new BinanceRequestMaker();
  }

  async create(trade: TradeOco) {
    const result = await this.binanceRequestMaker.request({
      url: "api/v3/order/oco",
      method: MethodType.POST,
      params: {
        symbol: trade.getCoin(),
        price: trade.getPrice(),
        side: trade.getSide(),
        quantity: trade.getQuantity(),
        stopPrice: trade.getStopPrice(),
        stopLimitPrice: trade.getStopLimitPrice(),
        stopLimitTimeInForce: "GTC",
      },
      config: {
        needsSignatue: true,
        needsTimestamp: true,
        needsToken: true,
      },
    });

    return { id: result.data.orderListId };
  }
}

export default BinanceTrade;
