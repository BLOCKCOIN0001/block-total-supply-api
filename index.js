const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');

const app = express();
const port = process.env.PORT || 3000;

// mint address
const MINT_ADDRESS = 'FQc74dVkSSnFXJH2HCR7ogEBvtD8V8WV5GLdRCcMo8Aa';

app.get('/', async (req, res) => {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const mintPubkey = new PublicKey(MINT_ADDRESS);
    const mintAccount = await connection.getParsedAccountInfo(mintPubkey);
    
    const totalSupply = mintAccount.value.data.parsed.info.supply;
    
    res.json({ total_supply: parseFloat(totalSupply) / Math.pow(10, 9) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch total supply' });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
