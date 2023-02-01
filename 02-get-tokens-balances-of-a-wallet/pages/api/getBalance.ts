import { BigNumber, ethers } from "ethers";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { erc20ABI } from "wagmi";
import { formatEther } from "ethers/lib/utils.js";

type Data = {
  balance: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const provider = new ethers.providers.AlchemyProvider(
    "arbitrum",
    process.env.ALCHEMY_ID
  );

  const magicContract = new ethers.Contract(
    "0x539bdE0d7Dbd336b79148AA742883198BBF60342",
    erc20ABI,
    provider
  );
  const balance = await magicContract.balanceOf(req.query.address);
  res.status(200).json({ balance: formatEther(balance) });
}
