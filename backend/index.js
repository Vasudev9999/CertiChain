import express from "express";
import {
    Client,
    PrivateKey,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TransferTransaction,
    TokenAssociateTransaction,
    NftId,
    AccountInfoQuery
} from "@hashgraph/sdk";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import FormData from "form-data";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Hedera client
const client = Client.forTestnet()
    .setOperator(process.env.OPERATOR_ID, PrivateKey.fromString(process.env.OPERATOR_KEY));

// Pinata API endpoints
const PINATA_API_URL = "https://api.pinata.cloud";
const PINATA_PIN_FILE_URL = `${PINATA_API_URL}/pinning/pinFileToIPFS`;

// Upload file to Pinata IPFS
const uploadToPinata = async (filePath) => {
    const data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    const headers = {
        ...data.getHeaders(),
        pinata_api_key: process.env.IPFS_API_KEY,
        pinata_secret_api_key: process.env.IPFS_SECRET_API_KEY,
    };

    const response = await axios.post(PINATA_PIN_FILE_URL, data, { headers });
    return response.data.IpfsHash;
};

// Check if an account is already associated with a token
const isTokenAssociated = async (accountId, tokenId) => {
    try {
        const accountInfo = await new AccountInfoQuery()
            .setAccountId(accountId)
            .execute(client);
        const associatedTokens = accountInfo.tokenRelationships;
        return !!associatedTokens[tokenId.toString()];
    } catch (error) {
        console.error("Error checking token association:", error);
        throw error;
    }
};

// Test IPFS connection
app.get("/test-ipfs", async (req, res) => {
    try {
        const metadata = { test: "IPFS connection test" };
        const filePath = "./test-metadata.json";
        fs.writeFileSync(filePath, JSON.stringify(metadata));

        const cid = await uploadToPinata(filePath);
        const metadataUrl = `https://ipfs.io/ipfs/${cid}`;
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
        const filePath = "./metadata.json";
        fs.writeFileSync(filePath, JSON.stringify(metadata));

        const cid = await uploadToPinata(filePath);
        const metadataUrl = `https://ipfs.io/ipfs/${cid}`;
        console.log("Metadata uploaded to IPFS:", metadataUrl);

        // Mint NFT
        const mintTx = await new TokenMintTransaction()
            .setTokenId(process.env.TOKEN_ID)
            .addMetadata(Buffer.from(metadataUrl))
            .freezeWith(client);

        const signedMintTx = await mintTx.sign(PrivateKey.fromString(process.env.SUPPLY_KEY));
        const mintResponse = await signedMintTx.execute(client);
        const mintReceipt = await mintResponse.getReceipt(client);
        const serial = mintReceipt.serials[0];
        console.log("NFT minted with serial:", serial);

        // Check token association status before associating
        const isAssociated = await isTokenAssociated(studentAccountId, process.env.TOKEN_ID);
        if (!isAssociated) {
            console.log("Account is not associated with the token. Associating now...");
            try {
                const tokenAssociateTx = new TokenAssociateTransaction()
                    .setAccountId(studentAccountId)
                    .setTokenIds([process.env.TOKEN_ID])
                    .freezeWith(client);
                const signedAssociateTx = await tokenAssociateTx.sign(PrivateKey.fromString(process.env.OPERATOR_KEY));
                const associateResponse = await signedAssociateTx.execute(client);
                await associateResponse.getReceipt(client);
                console.log("Token association completed.");
            } catch (assocError) {
                if (assocError.toString().includes("TOKEN_ALREADY_ASSOCIATED_TO_ACCOUNT")) {
                    console.log("Account already associated with the token. Continuing...");
                } else {
                    throw assocError;
                }
            }
        } else {
            console.log("Account is already associated with the token. Skipping association.");
        }

        // Only transfer if studentAccountId is different from the operator (treasury)
        if (studentAccountId !== process.env.OPERATOR_ID) {
            const nftId = new NftId(process.env.TOKEN_ID, serial);
            const transferTx = await new TransferTransaction()
                .addNftTransfer(nftId, process.env.OPERATOR_ID, studentAccountId)
                .freezeWith(client)
                .sign(PrivateKey.fromString(process.env.OPERATOR_KEY));
            const transferResponse = await transferTx.execute(client);
            await transferResponse.getReceipt(client);
            console.log("NFT transferred to student:", studentAccountId);
        } else {
            console.log("Student account is the same as operator. Skipping NFT transfer.");
        }

        res.json({ nftId: `${process.env.TOKEN_ID}:${serial}`, metadataUrl });
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
        const nftInfos = await new TokenNftInfoQuery().setNftId(nftId).execute(client);
        if (nftInfos.length === 0) {
            return res.status(404).json({ error: "Invalid NFT" });
        }
        const nftData = nftInfos[0];
        const metadataUrl = nftData.metadata.toString();
        const metadata = await axios.get(metadataUrl);
        res.json(metadata.data);
    } catch (error) {
        res.status(404).json({ error: "Invalid NFT" });
    }
});
// Start the server
app.listen(3000, () => console.log("Backend running on port 3000"));