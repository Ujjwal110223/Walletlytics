# Walletlytics

**Walletlytics** is a sleek, AI-powered wallet analytics dashboard that provides DeFi, NFT, and wallet-level insights using bitsCrunch APIs and AI summarization.

---

Live Link - [Live Link](https://walletlytics.vercel.app/)

---

Demo Link - [Demo Video Link](https://youtu.be/43W0AyBTRnI)

## Purpose & Vision

In the ever-expanding world of Web3, users are often overwhelmed by fragmented data across DeFi protocols and NFT ecosystems. **Walletlytics** bridges that gap by offering a unified, intelligent, and beautifully designed interface that not only aggregates data — but interprets it.

Our vision is to democratize wallet intelligence:
- Empower casual users with **human-readable insights**
- Help power users and analysts **spot trends** across tokens and collections
- Use **AI summarization** to make Web3 analytics more accessible and actionable

Walletlytics aims to be the go-to destination for on-chain self-awareness — a step toward smarter and more informed crypto participation.

---

## Features

- **Wallet Analysis**  
  Enter any EVM-compatible wallet address and fetch detailed data about the address across DeFi, NFTs, tokens, labels, and risk.  
  → **APIs Used**:
  - `GET /wallet/label` – Wallet tagging & behavioral labeling
  - `GET /wallet/score` – Risk score based on wallet activity
  - `GET /wallet/metrics` – Usage, holding, and engagement metrics

- **DeFi, NFT & Token Metrics**  
  Get a breakdown of asset categories and engagement across the Ethereum ecosystem.  
  → **APIs Used**:
  - `GET /wallet/balance/defi` – Shows wallet balance and positions across DeFi protocols  
  - `GET /wallet/balance/nft` – Lists NFT holdings across collections  
  - `GET /wallet/balance/token` – Shows ERC-20 token holdings and distribution  

- **AI-Generated Insights**  
  Wallet data is summarized into plain language using Gemini (Google AI), to give human-like interpretation of wallet behavior.  
  → **API Used**:
  - `POST /api/gemini-summary` – Custom serverless API that passes wallet data and title to Gemini for summarization


---
