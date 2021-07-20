export enum MethodType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type AnyObject = {
  [key: string]: any;
};

export type ConfigType = {
  needsSignatue: boolean;
  needsToken: boolean;
  needsTimestamp: boolean;
};

export type BinanceRequest = {
  url: string;
  method?: MethodType;
  data?: AnyObject;
  params?: AnyObject;
  config?: ConfigType;
};
