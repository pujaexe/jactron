import React, { useState, useEffect, useMemo } from 'react';
import { TronLinkAdapter, WalletReadyState } from '@tronweb3/tronwallet-adapters';

const ConnectWalletButton: React.FC = () => {
  const [readyState, setReadyState] = useState(WalletReadyState.NotFound);
  const [account, setAccount] = useState<string>('');
  const [network, setNetwork] = useState<object>({});
  const [signedMessage, setSignedMessage] = useState<string>('');

  const adapter = useMemo(() => new TronLinkAdapter(), []);

  useEffect(() => {
    setReadyState(adapter.state);
    setAccount(adapter.address!);

    adapter.on('connect', () => {
      setAccount(adapter.address!);
    });

    adapter.on('readyStateChanged', (state) => {
      setReadyState(state);
    });

    adapter.on('accountsChanged', (data) => {
      setAccount(data);
    });

    adapter.on('chainChanged', (data) => {
      setNetwork(data);
    });

    adapter.on('disconnect', () => {
      // Handle disconnect logic
      setAccount('');
      setNetwork({});
    });

    return () => {
      // Remove all listeners when the component is destroyed
      adapter.removeAllListeners();
    };
  }, [adapter]);

  async function signMessage() {
    try {
      const res = await adapter.signMessage('helloworld');
      setSignedMessage(res);
    } catch (error) {
      console.error('Failed to sign message:', error);
    }
  }

  return (
    <div className="App">
      <div>Ready State: {readyState}</div>
      <div>Current Address: {account}</div>
      <div>Current Network: {JSON.stringify(network)}</div>
      <button disabled={adapter.connected} onClick={() => adapter.connect()}>
        {adapter.connected ? 'Connected' : 'Connect to TronLink'}
      </button>
      <button onClick={signMessage} disabled={!adapter.connected}>
        Sign Message
      </button>
      <br />
      <div>Signed Message: {signedMessage}</div>
    </div>
  );
};

export default ConnectWalletButton;
