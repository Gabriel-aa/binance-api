import Trade from "../../application/entities/Trade/Trade";
import ITradeRepository from "../../application/modules/repositories/ITradeRepository";

class TradeRepository implements ITradeRepository {
  async save(trade: Trade) {
    console.log("trade saved to mysql", trade.getId());
  }
}

export default TradeRepository;
