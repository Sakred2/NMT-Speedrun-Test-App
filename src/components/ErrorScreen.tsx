import { WifiOff, RefreshCw, Home } from 'lucide-react';

interface Props {
  message: string;
  onRestartLocal: () => void;
  onHome: () => void;
}

export default function ErrorScreen({ message, onRestartLocal, onHome }: Props) {
  return (
    <div className="fe-panel animate-pop-in p-8 text-center ring-2 ring-rose-500/50 sm:p-10">
      {/* danger stripes */}
      <div
        className="mx-auto mb-5 h-3 w-2/3 rounded-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #ff7a3d, #ff7a3d 10px, #1a1d24 10px, #1a1d24 20px)',
        }}
      />
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl fe-btn bg-rose-600 text-white">
        <WifiOff className="h-10 w-10" />
      </div>
      <h2 className="font-display text-2xl font-900 uppercase text-rose-400">ПОТОП ЗЛОМІВ СИСТЕМУ</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-steel-50/80">{message}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onRestartLocal}
          className="fe-btn inline-flex items-center justify-center gap-2 px-6 py-3.5"
          style={{ backgroundColor: '#7ed957' }}
        >
          <RefreshCw className="h-5 w-5" />
          ПЕРЕЗАПУСК ЛОКАЛЬНО
        </button>
        <button
          onClick={onHome}
          className="fe-btn inline-flex items-center justify-center gap-2 px-6 py-3.5"
          style={{ backgroundColor: '#1a1d24', color: '#cfd4dd' }}
        >
          <Home className="h-5 w-5" />
          В ЛОБІ
        </button>
      </div>
    </div>
  );
}
