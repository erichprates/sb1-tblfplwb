interface BibleVerseProps {
  book: string;
  chapter: string;
  verse: string;
  text: string;
  reference: string;
}

export function BibleVerse({ book, chapter, verse, text, reference }: BibleVerseProps) {
  return (
    <div className="bg-[#cccab6] p-6">
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center bg-black text-white p-3 rounded-lg min-w-[60px]">
          <span className="text-sm font-bold">{book}</span>
          <span className="text-xs">{chapter}:{verse}</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-800 mb-2 italic">{text}</p>
          <p className="text-sm text-gray-600">{reference}</p>
        </div>
      </div>
    </div>
  );
}