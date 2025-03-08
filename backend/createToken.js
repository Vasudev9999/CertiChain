import { Client, PrivateKey, TokenCreateTransaction, TokenType, TokenSupplyType } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const client = Client.forTestnet()
    .setOperator(process.env.OPERATOR_ID, PrivateKey.fromString(process.env.OPERATOR_KEY));

  // Generate a new private key for the supply key
  const supplyKey = PrivateKey.generate();

  const tx = await new TokenCreateTransaction()
    .setTokenName("Certificates")
    .setTokenSymbol("CERT")
    .setTokenType(TokenType.NonFungibleUnique)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(5000)
    .setTreasuryAccountId(process.env.OPERATOR_ID)
    .setSupplyKey(supplyKey) // Add the supply key
    .execute(client);

  const receipt = await tx.getReceipt(client);
  console.log("Token ID:", receipt.tokenId.toString());
  console.log("Supply Key:", supplyKey.toString());
}

main();