import React, { useState } from 'react';
import TronWeb from 'tronweb';

const ConnectWalletButton: React.FC = () => {
  const [caption, setCaption] = useState<string>('Connect Wallet');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.tronWeb && window.tronWeb.ready) {
      try {
        const address = window.tronWeb.defaultAddress.base58;
        console.log('Connected to TronLink with address:', address);
        setIsConnected(true);
        setCaption('Disconnect');
      } catch (error) {
        console.error('Failed to connect to TronLink:', error);
        setCaption('Connect Wallet');
      }
    } else {
      console.error('TronLink not found. Please install TronLink.');
      setCaption('Connect Wallet');
    }
  };

  const disconnectWallet = () => {
    try {
      // Note: TronLink does not have a specific disconnect method, so we handle it manually.
      setIsConnected(false);
      setCaption('Connect Wallet');
      console.log('Disconnected from TronLink.');
    } catch (error) {
      console.error('Failed to disconnect from TronLink:', error);
      setCaption('Disconnect');
    }
  };

  const handleButtonClick = () => {
    if (caption === 'Connect Wallet') {
      connectWallet();
    } else if (caption === 'Disconnect') {
      disconnectWallet();
    }
  };

  return (
    <button onClick={handleButtonClick}>
      {caption}
    </button>
  );
};

export default ConnectWalletButton;
