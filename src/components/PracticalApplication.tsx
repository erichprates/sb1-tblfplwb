import { Hand } from 'lucide-react';

interface PracticalApplicationProps {
  text: string;
}

export function PracticalApplication({ text }: PracticalApplicationProps) {
  return (
    <div className="bg-[#dfe4d9] p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hand className="w-5 h-5" />
        <h2 className="font-semibold">Aplicação Prática</h2>
      </div>
      <p className="text-justify text-gray-700">{text}</p>
    </div>
  );
}