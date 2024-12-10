import { SPOTIFY_CONFIG } from '../constants/spotify';

const { CLIENT_ID, CLIENT_SECRET } = SPOTIFY_CONFIG;

export async function getSpotifyToken() {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
}

export async function searchSpotifyTrack(query: string, token: string) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=BR&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Falha na busca');
    }

    const data = await response.json();
    return data.tracks?.items[0] || null;
  } catch (error) {
    console.error('Erro na busca:', error);
    return null;
  }
}