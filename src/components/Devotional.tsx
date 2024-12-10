import { Fish } from 'lucide-react';

interface DevotionalProps {
  text: string;
}

export function Devotional({ text }: DevotionalProps) {
  return (
    <div className="bg-[#efefef] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Fish className="w-5 h-5" />
        <h2 className="font-semibold">Devocional</h2>
      </div>
      <p className="text-justify text-gray-700">{text}</p>
    </div>
  );
}