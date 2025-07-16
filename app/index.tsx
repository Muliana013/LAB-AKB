import React, { useState, useEffect } from 'react';

// Data gambar dengan URL asli dan cadangan
const IMAGE_LIST = [
  {
    id: 1,
    primary: 'https://picsum.photos/300/300?random=1',
    fallback: 'https://placehold.co/300x300/FF5733/FFFFFF?text=Fallback+1',
  },
  {
    id: 2,
    primary: 'https://picsum.photos/300/300?random=2',
    fallback: 'https://placehold.co/300x300/33FF57/FFFFFF?text=Fallback+2',
  },
  {
    id: 3,
    primary: 'https://picsum.photos/300/300?random=3',
    fallback: 'https://placehold.co/300x300/3357FF/FFFFFF?text=Fallback+3',
  },
  {
    id: 4,
    primary: 'https://picsum.photos/300/300?random=4',
    fallback: 'https://placehold.co/300x300/FF33A1/FFFFFF?text=Fallback+4',
  },
  {
    id: 5,
    primary: 'https://picsum.photos/300/300?random=5',
    fallback: 'https://placehold.co/300x300/A1FF33/FFFFFF?text=Fallback+5',
  },
  {
    id: 6,
    primary: 'https://picsum.photos/300/300?random=6',
    fallback: 'https://placehold.co/300x300/33A1FF/FFFFFF?text=Fallback+6',
  },
  {
    id: 7,
    primary: 'https://picsum.photos/300/300?random=7',
    fallback: 'https://placehold.co/300x300/FF3333/FFFFFF?text=Fallback+7',
  },
  {
    id: 8,
    primary: 'https://picsum.photos/300/300?random=8',
    fallback: 'https://placehold.co/300x300/33FF33/FFFFFF?text=Fallback+8',
  },
  {
    id: 9,
    primary: 'https://picsum.photos/300/300?random=9',
    fallback: 'https://placehold.co/300x300/3333FF/FFFFFF?text=Fallback+9',
  },
];

// Komponen individu untuk setiap gambar
const ImageCard = ({
  data,
  scale,
  onScaleChange,
}: {
  data: {
    id: number;
    primary: string;
    fallback: string;
  };
  scale: number;
  onScaleChange: (id: number, newScale: number) => void;
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleScale = () => {
    if (loading || error) return;
    const nextScale = scale >= 2 ? 1 : Math.min(scale * 1.2, 2);
    onScaleChange(data.id, nextScale);
    setUseFallback((prev) => !prev);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleScale}
        disabled={loading}
        className={`relative w-full h-full rounded-lg border-2 transition-all ${
          loading ? 'cursor-wait' : 'hover:border-blue-400'
        }`}
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {loading ? (
          <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-b-transparent rounded-full" />
          </div>
        ) : error ? (
          <div className="w-32 h-32 bg-red-200 flex flex-col items-center justify-center text-sm text-red-700">
            ⚠️ Gagal Muat
          </div>
        ) : (
          <img
            src={useFallback ? data.fallback : data.primary}
            onLoad={handleLoad}
            onError={handleError}
            alt={`Gambar ${data.id}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
      </button>
      {scale > 1 && (
        <button
          onClick={() => onScaleChange(data.id, 1)}
          className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          Reset Skala
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [scales, setScales] = useState(() =>
    IMAGE_LIST.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {} as Record<number, number>)
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateScale = (id: number, newScale: number) => {
    setScales((prev) => ({ ...prev, [id]: newScale }));
  };

  const resetAll = () => {
    const resetScales = IMAGE_LIST.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {} as Record<number, number>);
    setScales(resetScales);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Galeri Gambar Interaktif
      </h1>

      <div className="w-full max-w-5xl bg-white shadow rounded-xl p-6">
        <div className="mb-6 text-center">
          <button
            onClick={resetAll}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Reset Semua Skala
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {IMAGE_LIST.map((img) => (
            <ImageCard
              key={img.id}
              data={img}
              scale={scales[img.id]}
              onScaleChange={updateScale}
            />
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600 text-center">
          Klik gambar untuk memperbesar dan menampilkan versi alternatif.
        </div>
      </div>
    </div>
  );
}
