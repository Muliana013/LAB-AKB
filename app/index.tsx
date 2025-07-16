import React, { useState, useEffect } from 'react';

// Data gambar yang akan ditampilkan
const GAMBAR_DATA = [
  // ... (data gambar tetap sama)
];

type DataGambar = {
  penanda: number;
  asli: string;
  cadangan: string;
};

const GambarInteraktif = ({ 
  sumber, 
  skala, 
  onUpdateSkala 
}: { 
  sumber: DataGambar; 
  skala: number; 
  onUpdateSkala: (penanda: number, skala: number) => void; 
}) => {
  const [pakaiCadangan, setPakaiCadangan] = useState(false);
  const [gagalMuat, setGagalMuat] = useState(false);
  const [sedangMuat, setSedangMuat] = useState(true);

  const resetSkala = () => {
    onUpdateSkala(sumber.penanda, 1);
  };

  const tekan = () => {
    if (gagalMuat || sedangMuat) return;
    
    // PERBAIKAN 1: Implementasi scaling individual hingga 2x
    let skalaBaru: number;
    if (skala >= 2) {
      skalaBaru = 1;
    } else {
      // Tambahkan skala secara bertahap hingga maksimum 2x
      skalaBaru = Math.min(skala + 0.2, 2);
    }
    
    onUpdateSkala(sumber.penanda, skalaBaru);
    
    // Fungsionalitas perubahan gambar
    setPakaiCadangan(prev => !prev);
  };

  const handleImageLoad = () => {
    setSedangMuat(false);
    setGagalMuat(false);
  };

  const handleImageError = () => {
    setSedangMuat(false);
    setGagalMuat(true);
  };

  const gambarDipakai = pakaiCadangan ? sumber.cadangan : sumber.asli;

  return (
    <div className="w-full h-full flex flex-col">
      <button
        onClick={tekan}
        disabled={sedangMuat}
        className={`w-full h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-50 ${
          sedangMuat ? 'cursor-wait' : 'cursor-pointer'
        }`}
        style={{
          transform: `scale(${skala})`,
          transition: 'transform 0.3s ease-in-out',
          transformOrigin: 'center center' // PERBAIKAN: Pastikan scaling dari tengah
        }}
      >
        {sedangMuat ? (
          <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : gagalMuat ? (
          <div className="w-full h-full bg-red-100 flex justify-center items-center text-red-700 text-sm font-medium">
            <div className="text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div>Gagal Muat</div>
            </div>
          </div>
        ) : (
          <img
            src={gambarDipakai}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt={`Gambar ${sumber.penanda}`}
            className="w-full h-full object-cover"
          />
        )}
      </button>
      
      {skala > 1 && (
        <button
          onClick={resetSkala}
          className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
        >
          Reset Skala
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [lebarJendela, setLebarJendela] = useState(window.innerWidth);
  
  // PERBAIKAN 2: Penyelesaian kode useState yang terpotong
  const [skalaGambar, setSkalaGambar] = useState<Record<number, number>>(() => {
    const initialScales: Record<number, number> = {};
    GAMBAR_DATA.forEach(item => {
      initialScales[item.penanda] = 1;
    });
    return initialScales;
  });

  useEffect(() => {
    const handleResize = () => {
      setLebarJendela(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateSkalaGambar = (penanda: number, skala: number) => {
    setSkalaGambar(prev => ({
      ...prev,
      [penanda]: skala
    }));
  };

  const resetSemuaSkala = () => {
    const resetScales: Record<number, number> = {};
    GAMBAR_DATA.forEach(item => {
      resetScales[item.penanda] = 1;
    });
    setSkalaGambar(resetScales);
  };

  const ukuranSel = Math.floor((lebarJendela * 0.8) / 3) - 16;
  const ukuranSelMinimal = Math.max(ukuranSel, 120);

  const renderGrid = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {GAMBAR_DATA.map(item => (
          <div
            key={item.penanda}
            className="flex-shrink-0 mx-auto"
            style={{
              width: `${ukuranSelMinimal}px`,
              height: `${ukuranSelMinimal}px`,
            }}
          >
            <GambarInteraktif 
              sumber={item} 
              skala={skalaGambar[item.penanda]} 
              onUpdateSkala={updateSkalaGambar}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 mt-4 text-center">
        Galeri Gambar Interaktif
      </h1>
      
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={resetSemuaSkala}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Reset Semua Skala
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
          {GAMBAR_DATA.map(item => (
            <div key={item.penanda} className="text-center">
              Gambar {item.penanda}: {skalaGambar[item.penanda].toFixed(1)}x
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          {renderGrid()}
        </div>
      </div>
      
      <div className="text-center mt-6 max-w-2xl">
        <p className="text-sm text-gray-600 mb-2">
          Klik pada gambar untuk melihat versi cadangan dan memperbesar!
        </p>
        <p className="text-xs text-gray-500">
          Skala maksimum: 2x | Klik lagi saat mencapai maksimum untuk mereset
        </p>
      </div>
    </div>
  );
}
