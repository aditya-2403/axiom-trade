'use client';

import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchTokens, setSort } from '@/store/slices/tokenSlice';
import { Token } from '@/types';

export const useTokenData = (category?: string) => {
  const dispatch = useDispatch();
  const { tokens, sortBy, sortDirection, loading, error } = useSelector(
    (state: RootState) => state.tokens
  );

  const { refetch } = useQuery({
    queryKey: ['tokens', category],
    queryFn: async () => {
      const result = await dispatch(fetchTokens(category) as any);
      return result.payload;
    },
    enabled: false, // We'll trigger manually on mount
  });

  const handleSort = (column: keyof Token) => {
    dispatch(setSort(column));
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return {
    tokens,
    sortBy,
    sortDirection,
    loading,
    error,
    handleSort,
    formatNumber,
    refetch,
  };
};