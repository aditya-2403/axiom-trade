import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Token, TableState } from '@/types';
import { mockTokens } from '@/lib/constants';

const initialState: TableState = {
  tokens: mockTokens,
  sortBy: null,
  sortDirection: 'desc',
  loading: false,
  error: null,
  selectedToken: null,
};

export const fetchTokens = createAsyncThunk(
  'tokens/fetchTokens',
  async (category?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (category) {
      return mockTokens.filter(token => token.category === category);
    }
    return mockTokens;
  }
);

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<keyof Token>) => {
      if (state.sortBy === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortDirection = 'desc';
      }
      
      // Sort tokens
      state.tokens.sort((a, b) => {
        const aVal = a[action.payload];
        const bVal = b[action.payload];
        const multiplier = state.sortDirection === 'asc' ? 1 : -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * multiplier;
        }
        return String(aVal).localeCompare(String(bVal)) * multiplier;
      });
    },
    
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const token = state.tokens.find(t => t.id === action.payload.id);
      if (token) {
        const oldPrice = token.price;
        token.price = action.payload.price;
        token.lastUpdated = new Date().toISOString();
        
        // Calculate price change if needed
        if (oldPrice !== action.payload.price) {
          const change = action.payload.price - oldPrice;
          token.priceChange24h += change;
          token.priceChangePercent24h = (change / oldPrice) * 100;
        }
      }
    },
    
    selectToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tokens';
      });
  },
});

export const { setSort, updateTokenPrice, selectToken } = tokenSlice.actions;
export default tokenSlice.reducer;