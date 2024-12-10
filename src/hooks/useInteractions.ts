import { useEffect } from 'react';
import { useInteractionsStore } from '../store/interactionsStore';

export function useInteractions() {
  const store = useInteractionsStore();

  useEffect(() => {
    store.initialize();
  }, []);

  return {
    likes: store.interactions.likes,
    shares: store.interactions.shares,
    setLikes: store.updateLikes,
    setShares: store.updateShares,
    isLoading: store.isLoading,
    error: store.error
  };
}