export type QuantityEdgesType = {
  maxNumber: number;
  maxDecimals: number;
};

interface IExchangeCoinInfo {
  getQuantityEdges(symbol: string): Promise<QuantityEdgesType>;
}

export default IExchangeCoinInfo;
