export const getTokenIcon = (symbol: string, chain?: string): string => {
  const baseUrl = 'https://cryptologos.cc/logos';
  
  const iconMap: Record<string, string> = {
    'ETH': `${baseUrl}/ethereum-eth-logo.png`,
    'BTC': `${baseUrl}/bitcoin-btc-logo.png`,
    'SOL': `${baseUrl}/solana-sol-logo.png`,
    'MATIC': `${baseUrl}/polygon-matic-logo.png`,
    'AVAX': `${baseUrl}/avalanche-avax-logo.png`,
    'LINK': `${baseUrl}/chainlink-link-logo.png`,
    'UNI': `${baseUrl}/uniswap-uni-logo.png`,
    'ADA': `${baseUrl}/cardano-ada-logo.png`,
    'DOGE': `${baseUrl}/dogecoin-doge-logo.png`,
    'AXM': `${baseUrl}/ethereum-eth-logo.png`, // placeholder
  };

  return iconMap[symbol] || `${baseUrl}/ethereum-eth-logo.png`;
};