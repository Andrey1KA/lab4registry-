import { ethers } from "ethers";
import { useEffect } from "react";
import './App.css'
import BalanceReader from './BalanceReader';
import BlockExplorer from './BlockExplorer';
import VendingMachine from './VendingMachine';
import PriceFeed from './PriceFeed';

const providerUrl = 'http://77.51.210.148:48545/';
const provider = new ethers.JsonRpcProvider(providerUrl);

function App() {
  useEffect(() => {
    provider.getNetwork().then((network) => {
      console.log(network);
    });
  }, []);
  return (
    <>
      <BalanceReader provider={provider} />
      <BlockExplorer provider={provider} />
      <VendingMachine provider={provider} />
      <PriceFeed provider={provider} />
    </>
  )
}

export default App
