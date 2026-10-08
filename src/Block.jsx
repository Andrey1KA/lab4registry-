import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function Block({ blocknum, provider }) {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState();
  const [tx, setTx] = useState();

  function toggle() { setOpen(!open); }

  useEffect(() => {
    let ignore = false;
    async function getBlock() {
      const blockInfo = await provider.getBlock(blocknum);
      console.log(blockInfo);
      if (!ignore) {
        setBlock(blockInfo);
        setTx();
      }
    }
    getBlock();
    return () => { ignore = true; };
  }, [blocknum, provider]);

  async function showTransaction(hash) {
    const transaction = await provider.getTransaction(hash);
    console.log(transaction);
    setTx(transaction);
  }

  return (
    <div>
      <hr />
      <button type="button" onClick={toggle}>Block # {blocknum}</button>
      {open && block &&
        <div>
          <p>Block hash: {block.hash}</p>
          <p>Parent hash: {block.parentHash}</p>
          {block.transactions.map((hash) => (
            <button type="button" className="tx" key={hash} onClick={() => showTransaction(hash)}>
              {hash}
            </button>
          ))}
          {tx &&
            <div className="tx-details">
              <p>Tx hash: {tx.hash}</p>
              <p>From: {tx.from}</p>
              <p>To: {tx.to}</p>
              <p>Value: {ethers.formatEther(tx.value)} ETH</p>
              <p>Nonce: {tx.nonce.toString()}</p>
              <p>Input data: {tx.data}</p>
            </div>}
        </div>}
    </div>
  )
}

export default Block;
