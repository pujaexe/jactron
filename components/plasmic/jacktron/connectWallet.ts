import TronWeb from 'tronweb';

export const connectWallet = async (): Promise<void> => {
  if (typeof window !== 'undefined' && window.tronWeb && window.tronWeb.ready) {
    const address = window.tronWeb.defaultAddress.base58;
    console.log('Connected to TronLink with address:', address);
    // Lakukan tindakan setelah berhasil terhubung, seperti menyimpan alamat pengguna
  } else {
    console.error('TronLink not found. Please install TronLink.');
  }
};
