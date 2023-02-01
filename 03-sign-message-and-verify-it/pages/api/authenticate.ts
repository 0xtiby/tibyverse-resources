import type { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyMessage } from "ethers/lib/utils.js";

type Data =
  | {
      success: boolean;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { address, signed } = req.body;
    try {
      if (!address || !signed) {
        throw new Error("invalid body");
      }
      const signerAddress = verifyMessage(`authenticate:${address}`, signed);
      res.status(201).json({ success: signerAddress === address });
    } catch (error: any) {
      console.error(error.toString());
      res.status(400).json({ error: "bad request" });
    }
  } else {
    res.status(400).json({ error: "bad request" });
  }
}
