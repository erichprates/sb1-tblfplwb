import { Calendar, Heart, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useInteractions } from '../hooks/useInteractions';

interface HeaderProps {
  date: string;
  title: string;
}

export function Header({ date, title }: HeaderProps) {
  const { likes, shares, setLikes, setShares, isLoading } = useInteractions();
  const [isLiked, setIsLiked] = useState(() => {
    return localStorage.getItem('has-liked') === 'true';
  });

  const handleShare = () => {
    if (isLoading) return;
    
    const text = `Café com Fé - ${title}\n${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setShares(shares + 1);
  };

  const handleLike = () => {
    if (isLoading) return;

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    localStorage.setItem('has-liked', String(newIsLiked));
    
    const newLikes = likes + (newIsLiked ? 1 : -1);
    if (newLikes >= 0) {
      setLikes(newLikes);
    }
  };

  return (
    <div className="bg-[#d0e3bc] px-8 py-6">
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-light">{date}</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">{title}</h1>
      <div className="flex gap-6">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 transition-colors duration-300"
          aria-label="Like"
          disabled={isLoading}
        >
          <Heart
            className={`w-7 h-7 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
          <span className="text-xl font-medium">{likes}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2"
          aria-label="Share"
          disabled={isLoading}
        >
          <Send className="w-7 h-7 text-gray-600" />
          <span className="text-xl font-medium">{shares}</span>
        </button>
      </div>
    </div>
  );
}