import { useState, useEffect } from "react";
import { ethers } from "ethers";

const feedAddress = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const abi = [
  "function description() view returns (string)",
  "function decimals() view returns (uint8)",
  "function latestRoundData() view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)"
];

function PriceFeed({ provider }) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function readFeed() {
      const feed = new ethers.Contract(feedAddress, abi, provider);
      const description = await feed.description();
      const decimals = await feed.decimals();
      const round = await feed.latestRoundData();
      console.log(description, decimals, round);
      setDescription(description);
      setPrice(ethers.formatUnits(round.answer, decimals));
    }
    readFeed();
  }, [provider]);

  return (
    <div className="container">
      <h1>ETH / USD</h1>
      <p>{feedAddress}</p>
      <div className="balance">{description}: {price} USD</div>
    </div>
  );
}

export default PriceFeed;
