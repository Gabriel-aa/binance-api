import Trade from "../../entities/Trade/Trade";

interface ITradeRepository {
  save(trade: Trade): Promise<void>;
}

export default ITradeRepository;
