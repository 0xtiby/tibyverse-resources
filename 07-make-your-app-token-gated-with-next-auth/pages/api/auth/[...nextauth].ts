import { Alchemy, Network } from "alchemy-sdk";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY || "",
  network: Network.ETH_MAINNET,
  maxRetries: 0,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        } as CredentialInput,
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(
            process.env.NEXTAUTH_URL ?? "http://localhost:3000/"
          );

          const crsf = await getCsrfToken({ req } as any);
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: crsf,
          });

          const isOwner = await alchemy.nft.verifyNftOwnership(
            siwe.address,
            "0xB852c6b5892256C264Cc2C888eA462189154D8d7"
          );

          if (result.success && isOwner) {
            return {
              id: siwe.address,
              isOwner,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      /* Step 1: update the token based on the user object */
      if (user) {
        token.isOwner = (user as any).isOwner;
      } else {
        token.isOwner = await alchemy.nft.verifyNftOwnership(
          token.sub ?? "",
          "0xB852c6b5892256C264Cc2C888eA462189154D8d7"
        );
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub;
      session.user.name = token.sub;
      session.isOwner = token.isOwner;
      return session;
    },
  },
};

export default NextAuth(authOptions);
