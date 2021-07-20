import IExchangeCoinInfo from "../../../application/modules/exchanges/IExchangeCoinInfo";
import { countDecimals } from "../../../helpers/numberHelper";
import BinanceRequestMaker from "../BinanceRequestMaker";
import { MethodType } from "../types";

type Filter = {
  filterType: string;
  minQty: string;
  maxQty: string;
  stepSize: string;
};

class BinanceCoinInfo implements IExchangeCoinInfo {
  private binanceRequestMaker;

  constructor() {
    this.binanceRequestMaker = new BinanceRequestMaker();
  }

  async getQuantityEdges(symbol: string) {
    try {
      const info = await this.getCoinInfo(symbol);
      const filter = this.findFilter(info.symbols[0].filters, "LOT_SIZE");

      return {
        maxNumber: Math.round(Number(filter?.maxQty || "0")).toString().length,
        maxDecimals: countDecimals(Number(filter?.minQty || 0)),
      };
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao buscar o filtro LOT_SIZE");
    }
  }

  async getCoinInfo(symbol: string): Promise<any> {
    const result = await this.binanceRequestMaker.request({
      url: `api/v3/exchangeInfo`,
      method: MethodType.GET,
      params: {
        symbol,
      },
      config: {
        needsSignatue: false,
        needsTimestamp: false,
        needsToken: true,
      },
    });

    return result.data;
  }

  private findFilter(
    filters: Filter[],
    filterName: string
  ): Filter | undefined {
    return filters.find((f: Filter): boolean => {
      return f.filterType === filterName;
    });
  }
}

export default BinanceCoinInfo;
