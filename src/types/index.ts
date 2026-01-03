export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  volume24h: number;
  liquidity: number;
  age: number; // in hours
  category: 'new' | 'final-stretch' | 'migrated';
  chain: string;
  address: string;
  lastUpdated: string;
  imageUrl?: string;
}

export interface TableState {
  tokens: Token[];
  sortBy: keyof Token | null;
  sortDirection: 'asc' | 'desc';
  loading: boolean;
  error: string | null;
  selectedToken: Token | null;
}

export interface WebSocketMessage {
  type: 'price_update' | 'volume_update' | 'new_token';
  data: Partial<Token> & { id: string };
}