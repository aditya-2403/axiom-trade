'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateTokenPrice } from '@/store/slices/tokenSlice';
import { WebSocketMessage } from '@/types';
import { mockTokens } from '@/lib/constants';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    // Mock WebSocket connection for simulation
    if (typeof window === 'undefined') return;

    // In production
    // wsRef.current = new WebSocket('wss://api.axiom.trade/ws');
    
    // Simulate WebSocket updates
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockTokens.length);
      const randomToken = mockTokens[randomIndex];
      if (!randomToken) return;

      const priceChange = (Math.random() - 0.5) * randomToken.price * 0.02;
      const newPrice = randomToken.price + priceChange;
      
      dispatch(updateTokenPrice({
        id: randomToken.id,
        price: Number(newPrice.toFixed(4))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const cleanup = connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (cleanup) cleanup();
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage };
};