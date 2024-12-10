import { ThemeToggle } from './components/ThemeToggle';
import { Header } from './components/Header';
import { BibleVerse } from './components/BibleVerse';
import { Devotional } from './components/Devotional';
import { PracticalApplication } from './components/PracticalApplication';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { useDailySong } from './hooks/useDailySong';
import { useTheme } from './hooks/useTheme';
import { useEffect, useState } from 'react';

function App() {
  const { isDark } = useTheme();
  const [logoUrl, setLogoUrl] = useState(
    isDark 
      ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
      : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
  );
  
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentSong = useDailySong();

  useEffect(() => {
    setLogoUrl(
      isDark 
        ? 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo2.png'
        : 'https://basisbranding.com.br/wp-content/uploads/2024/12/logo1.png'
    );
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-center mb-8">
          <img 
            src={logoUrl} 
            alt="Café com Fé" 
            className="h-20 w-auto transition-all duration-300 ease-in-out"
          />
        </div>
        
        <ThemeToggle />

        <div className="flex flex-col gap-6">
          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <Header
              date={today}
              title="Você Não Está Aqui por Acaso"
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <BibleVerse
              book="JR"
              chapter="1"
              verse="5"
              text="Antes de formar você no ventre, eu o escolhi; antes de você nascer, eu o separei."
              reference="Jeremias 1:5"
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <Devotional
              text="Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito. Muitas vezes, podemos nos perguntar: 'Por que estou aqui?' A resposta está em Deus. Ele formou você com um objetivo eterno, maior do que suas ambições pessoais ou circunstâncias atuais. Hoje, comece a pensar na vida como parte de algo muito maior: o plano divino."
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <PracticalApplication
              text="Reserve cinco minutos hoje para orar e perguntar a Deus: 'Qual é o propósito que o Senhor tem para mim?' Escreva qualquer inspiração ou ideia que surgir. Reflita sobre os talentos e paixões que Ele colocou em sua vida"
            />
          </div>

          <div className="card-enter card-hover bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <SpotifyPlayer {...currentSong} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;