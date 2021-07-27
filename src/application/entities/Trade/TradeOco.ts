import ValidationError from "../../../errors/ValidationError";
import Trade from "./Trade";
import { TradeOcoProps } from "./TradeTypes";

class TradeOco extends Trade {
  private price!: number;
  private quantity!: number;
  private stopPrice!: number;
  private stopLimitPrice!: number;

  constructor(props: TradeOcoProps) {
    super({ coin: props.coin });

    if (props.stopLimitPrice > props.stopPrice) {
      throw new ValidationError(
        "stopLimitPrice should be equal or lower than stopPrice"
      );
    }

    Object.assign(this, props);
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  getStopPrice() {
    return this.stopPrice;
  }

  getStopLimitPrice() {
    return this.stopLimitPrice;
  }
}

export default TradeOco;
