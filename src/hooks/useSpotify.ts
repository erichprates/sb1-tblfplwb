import { useEffect, useState, useCallback } from 'react';
import { getSpotifyToken, searchSpotifyTrack } from '../services/spotify';

export function useSpotify() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeSpotify = async () => {
      const accessToken = await getSpotifyToken();
      if (accessToken) {
        setToken(accessToken);
        setIsAuthenticated(true);
      }
    };

    initializeSpotify();
  }, []);

  const searchTrack = useCallback(async (query: string) => {
    if (!token) return null;
    return searchSpotifyTrack(query, token);
  }, [token]);

  return {
    isAuthenticated,
    token,
    searchTrack,
  };
}