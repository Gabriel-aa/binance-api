import axios, { AxiosPromise, AxiosResponse } from "axios";
import { createHmac } from "crypto";
import { formatProps } from "../../helpers/requestHelper";
import { BinanceRequest, MethodType } from "./types";

class BinanceRequestMaker {
  private dateDiff!: number;
  private binanceEndpoint: string;
  private binanceApiSecret: string;
  private binanceApiKey: string;

  constructor() {
    this.binanceEndpoint = process.env.BINANCE_URL || "";
    this.binanceApiSecret = process.env.BINANCE_SECRET_KEY || "";
    this.binanceApiKey = process.env.BINANCE_API_KEY || "";
  }

  async request(binanceRequest: BinanceRequest): Promise<AxiosPromise> {
    const { formattedUrl, headers } = await this.getRequestInfo(binanceRequest);

    return axios({
      url: formattedUrl,
      method: binanceRequest.method || MethodType.GET,
      headers,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  private async getRequestInfo(binanceRequest: BinanceRequest): Promise<any> {
    const headers: any = {};
    const {
      url,
      config = {
        needsSignature: true,
        needsTimestamp: true,
        needsToken: true,
      },
      params = {},
      data = {},
    } = binanceRequest;

    let formattedUrl = `${this.binanceEndpoint}/${url}`;
    if (config.needsTimestamp) {
      params.timestamp = await this.getTimestamp();
    }

    if (config.needsSignature) {
      params.signature = this.buildSignature({
        params: formatProps(params),
        body: formatProps(data),
      });
    }

    if (config.needsToken) {
      headers["X-MBX-APIKEY"] = this.binanceApiKey;
    }

    formattedUrl += `?${formatProps(params)}`;

    return { formattedUrl, headers };
  }

  private buildSignature({ params = "", body = "" } = {}) {
    const hash = createHmac("sha256", this.binanceApiSecret)
      .update(`${params}${body}`)
      .digest("hex");

    return hash;
  }

  private async getTimestamp() {
    if (!this.dateDiff) {
      await this.setDateDiff();
    }

    return new Date().getTime() + this.dateDiff;
  }

  private async setDateDiff(): Promise<void> {
    const status = await this.getStatus();
    this.dateDiff =
      new Date(status.headers["date"]).getTime() - new Date().getTime();
  }

  private getStatus(): Promise<AxiosResponse> {
    return axios
      .get(`${this.binanceEndpoint}/sapi/v1/system/status`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(`error => ${error}`);
        return error;
      });
  }
}

export default BinanceRequestMaker;
