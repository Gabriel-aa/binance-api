import { createHmac } from "crypto";

const generateSignature = ({ params = "", body = "" } = {}) => {
  const secret: any = process.env.BINANCE_SECRET_KEY;
  const hash = createHmac("sha256", secret)
    .update(`${params}${body}`)
    .digest("hex");

  return hash;
};

export { generateSignature };
