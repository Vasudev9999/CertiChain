import express from "express";
import { Client, PrivateKey, TokenMintTransaction, TransferTransaction, NftId } from "@hashgraph/sdk";
import { create } from "ipfs-http-client";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Hedera client
const client = Client.forTestnet()
  .setOperator(process.env.OPERATOR_ID, PrivateKey.fromString(process.env.OPERATOR_KEY));

// Initialize IPFS client with Infura
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(`${process.env.IPFS_API_KEY}:${process.env.IPFS_SECRET_API_KEY}`).toString("base64")}`,
  },
});

// Test IPFS connection
app.get("/test-ipfs", async (req, res) => {
  try {
    const metadata = { test: "IPFS connection test" };
    const { cid } = await ipfs.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${cid.path}`;
    res.json({ success: true, metadataUrl });
  } catch (error) {
    console.error("IPFS connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mint NFT and transfer to student
app.post("/mint", async (req, res) => {
  const { studentName, course, date, studentAccountId } = req.body;

  console.log("Received request to mint NFT:", { studentName, course, date, studentAccountId });

  try {
    // Upload metadata to IPFS
    const metadata = { studentName, course, date };
    console.log("Uploading metadata to IPFS:", metadata);

    const { cid } = await ipfs.add(JSON.stringify(metadata));
    const metadataUrl = `https://ipfs.io/ipfs/${cid.path}`;
    console.log("Metadata uploaded to IPFS:", metadataUrl);

    // Mint NFT
    const mintTx = await new TokenMintTransaction()
      .setTokenId(process.env.TOKEN_ID)
      .addMetadata(Buffer.from(metadataUrl)) // Store CID in NFT metadata
      .freezeWith(client) // Freeze the transaction
      .sign(PrivateKey.fromString(process.env.SUPPLY_KEY)) // Sign with the supply key
      .execute(client);

    const mintReceipt = await mintTx.getReceipt(client);
    const serial = mintReceipt.serials[0];
    console.log("NFT minted with serial:", serial);

    // Transfer NFT to student
    const nftId = new NftId(process.env.TOKEN_ID, serial);
    const transferTx = await new TransferTransaction()
      .addNftTransfer(nftId, process.env.OPERATOR_ID, studentAccountId)
      .execute(client);

    await transferTx.getReceipt(client);
    console.log("NFT transferred to student:", studentAccountId);

    res.json({ nftId: nftId.toString(), metadataUrl });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res.status(500).json({ error: error.message });
  }
});

// Verify NFT
app.get("/nft/:tokenId/:serial", async (req, res) => {
  const { tokenId, serial } = req.params;
  try {
    const nftId = new NftId(tokenId, serial);
    const nftInfo = await nftId.getInfo(client);
    const metadata = await axios.get(`https://ipfs.io/ipfs/${nftInfo.metadata.toString()}`);
    res.json(metadata.data);
  } catch (error) {
    res.status(404).json({ error: "Invalid NFT" });
  }
});

// Start the server
app.listen(3000, () => console.log("Backend running on port 3000"));