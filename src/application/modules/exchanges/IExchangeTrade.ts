import Trade from "../../entities/Trade/Trade";

export type CreateResponse = {
  id: string;
};

interface IExtendTrade {
  create(trade: Trade): Promise<CreateResponse>;
}

export default IExtendTrade;
