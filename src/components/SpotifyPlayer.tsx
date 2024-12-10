import { useEffect, useState } from 'react';
import { useSpotify } from '../hooks/useSpotify';
import { SpotifyIcon } from './spotify/SpotifyIcon';
import { TrackInfo } from './spotify/TrackInfo';
import { PlayButton } from './spotify/PlayButton';

interface SpotifyPlayerProps {
  songTitle: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  coverUrl: string;
}

export function SpotifyPlayer({
  songTitle,
  artist,
  album,
  year,
  duration,
  coverUrl,
}: SpotifyPlayerProps) {
  const { isAuthenticated, searchTrack } = useSpotify();
  const [track, setTrack] = useState<any>(null);

  useEffect(() => {
    const loadTrack = async () => {
      if (isAuthenticated) {
        const foundTrack = await searchTrack(`${songTitle} ${artist}`);
        if (foundTrack) {
          setTrack(foundTrack);
        }
      }
    };

    loadTrack();
  }, [isAuthenticated, songTitle, artist, searchTrack]);

  const handlePlay = () => {
    if (track?.external_urls?.spotify) {
      window.open(track.external_urls.spotify, '_blank');
    }
  };

  const fallbackTrackInfo = {
    name: songTitle,
    artists: [{ name: artist }],
    album: {
      name: album,
      release_date: `${year}-01-01`,
      images: [{ url: coverUrl }]
    },
    duration_ms: duration.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0) * 1000,
    external_urls: { spotify: '' }
  };

  const currentTrack = track || fallbackTrackInfo;

  return (
    <div className="bg-[#1d1d1b] px-8 py-6 text-white">
      <div className="flex items-center gap-2 mb-6">
        <SpotifyIcon />
        <span className="text-[#1DB954] font-semibold">Spotify</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-800">
          <img
            src={currentTrack.album.images[0]?.url || coverUrl}
            alt={`${currentTrack.album.name} cover`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <TrackInfo track={currentTrack} />
        <PlayButton onClick={handlePlay} />
      </div>
    </div>
  );
}