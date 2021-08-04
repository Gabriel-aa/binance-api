import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import BinanceRequestMaker from "../BinanceRequestMaker";

const axiosMock = new MockAdapter(axios);
let requestMaker: BinanceRequestMaker;

describe("BinanceRequestMaker tests", () => {
  beforeAll(() => {
    requestMaker = new BinanceRequestMaker();
  });

  beforeEach(() => {
    axiosMock.resetHistory();
    axiosMock.onGet("/test").reply(200);

    const getTimestamp = jest.spyOn(
      BinanceRequestMaker.prototype as any,
      "getTimestamp"
    );

    getTimestamp.mockImplementation(() => 1625853144000);
  });

  it("should make a request correctly", async () => {
    await requestMaker.request({ url: "test" });
    expect(axiosMock.history.get[0].headers["X-MBX-APIKEY"]).toBeDefined();
    expect(axiosMock.history.get[0].url).toEqual(
      "/test?timestamp=1625853144000&signature=6feb9f0ef167341a7d760ece349841e9863c45bfb49ca3e939b0af14511cff37"
    );
  });

  it("should not build a signature if requested", async () => {
    await requestMaker.request({
      url: "test",
      config: {
        needsSignature: false,
        needsTimestamp: true,
        needsToken: true,
      },
    });

    expect(axiosMock.history.get[0].headers["X-MBX-APIKEY"]).toBeDefined();
    expect(axiosMock.history.get[0].url).toEqual(
      "/test?timestamp=1625853144000"
    );
  });

  it("should not build a timestamp if requested", async () => {
    await requestMaker.request({
      url: "test",
      config: {
        needsSignature: false,
        needsTimestamp: false,
        needsToken: true,
      },
    });

    expect(axiosMock.history.get[0].headers["X-MBX-APIKEY"]).toBeDefined();
    expect(axiosMock.history.get[0].url).toEqual("/test?");
  });

  it("should not send the api token if requested", async () => {
    await requestMaker.request({
      url: "test",
      config: {
        needsSignature: false,
        needsTimestamp: false,
        needsToken: false,
      },
    });

    expect(axiosMock.history.get[0].headers["X-MBX-APIKEY"]).toBeUndefined();
    expect(axiosMock.history.get[0].url).toEqual("/test?");
  });
});
