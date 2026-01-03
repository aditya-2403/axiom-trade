'use client';

import { useState, useMemo, useCallback } from 'react';
import { Token } from '@/types';

export const useTableSort = (initialData: Token[]) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Token | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'desc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return initialData;

    return [...initialData].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      const multiplier = sortConfig.direction === 'asc' ? 1 : -1;

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1 * multiplier;
      if (bVal == null) return -1 * multiplier;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * multiplier;
      }

      return String(aVal).localeCompare(String(bVal)) * multiplier;
    });
  }, [initialData, sortConfig]);

  const handleSort = useCallback((key: keyof Token) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  return {
    sortedData,
    sortConfig,
    handleSort,
  };
};