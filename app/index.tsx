import React, { useState, useEffect } from 'react';

// Data gambar yang akan ditampilkan - menggunakan URL yang lebih reliable
const GAMBAR_DATA = [
  {
    penanda: 1,
    asli: 'https://picsum.photos/300/300?random=1',
    cadangan: 'https://placehold.co/300x300/FF5733/FFFFFF?text=Cadangan+1',
  },
  {
    penanda: 2,
    asli: 'https://picsum.photos/300/300?random=2',
    cadangan: 'https://placehold.co/300x300/33FF57/FFFFFF?text=Cadangan+2',
  },
  {
    penanda: 3,
    asli: 'https://picsum.photos/300/300?random=3',
    cadangan: 'https://placehold.co/300x300/3357FF/FFFFFF?text=Cadangan+3',
  },
  {
    penanda: 4,
    asli: 'https://picsum.photos/300/300?random=4',
    cadangan: 'https://placehold.co/300x300/FF33A1/FFFFFF?text=Cadangan+4',
  },
  {
    penanda: 5,
    asli: 'https://picsum.photos/300/300?random=5',
    cadangan: 'https://placehold.co/300x300/A1FF33/FFFFFF?text=Cadangan+5',
  },
  {
    penanda: 6,
    asli: 'https://picsum.photos/300/300?random=6',
    cadangan: 'https://placehold.co/300x300/33A1FF/FFFFFF?text=Cadangan+6',
  },
  {
    penanda: 7,
    asli: 'https://picsum.photos/300/300?random=7',
    cadangan: 'https://placehold.co/300x300/FF3333/FFFFFF?text=Cadangan+7',
  },
  {
    penanda: 8,
    asli: 'https://picsum.photos/300/300?random=8',
    cadangan: 'https://placehold.co/300x300/33FF33/FFFFFF?text=Cadangan+8',
  },
  {
    penanda: 9,
    asli: 'https://picsum.photos/300/300?random=9',
    cadangan: 'https://placehold.co/300x300/3333FF/FFFFFF?text=Cadangan+9',
  },
];

// Tipe data untuk properti gambar
type DataGambar = {
  penanda: number;
  asli: string;
  cadangan: string;
};

// Komponen GambarInteraktif untuk setiap gambar di grid
const GambarInteraktif = ({ sumber }: { sumber: DataGambar }) => {
  // State untuk menentukan apakah menggunakan gambar cadangan
  const [pakaiCadangan, setPakaiCadangan] = useState(false);
  // State untuk skala gambar saat diklik dengan pembatasan maksimum 2x
  const [skala, setSkala] = useState(1);
  // State untuk menandai apakah gambar gagal dimuat
  const [gagalMuat, setGagalMuat] = useState(false);
  // State untuk loading
  const [sedangMuat, setSedangMuat] = useState(true);

  // Fungsi untuk mereset skala gambar ke 1
  const resetSkala = () => {
    setSkala(1);
  };

  // Fungsi yang dipanggil saat gambar diklik
  const tekan = () => {
    // Jika gambar sudah gagal dimuat atau masih loading, jangan lakukan apa-apa
    if (gagalMuat || sedangMuat) return;
    
    // Fungsi penskalaan gambar dengan pembatasan maksimum 2x
    if (skala >= 2) {
      // Jika sudah mencapai skala maksimum, reset ke 1
      setSkala(1);
    } else {
      // Perbesar skala sebesar 1.2x dengan batas maksimum 2x
      setSkala(prev => Math.min(prev * 1.2, 2));
    }
    
    // Fungsionalitas perubahan gambar ke versi cadangan saat diklik
    setPakaiCadangan(prev => !prev);
  };

  // Handler untuk ketika gambar berhasil dimuat
  const handleImageLoad = () => {
    setSedangMuat(false);
    setGagalMuat(false);
  };

  // Handler untuk ketika gambar gagal dimuat
  const handleImageError = () => {
    setSedangMuat(false);
    setGagalMuat(true);
  };

  // Tentukan URL gambar yang akan digunakan (asli atau cadangan)
  const gambarDipakai = pakaiCadangan ? sumber.cadangan : sumber.asli;

  return (
    // Container dengan ukuran yang konsisten dan sama untuk semua sel gambar
    <div className="w-full h-full flex flex-col">
      {/* Tombol/area yang bisa diklik untuk interaksi gambar */}
      <button
        onClick={tekan}
        disabled={sedangMuat}
        className={`w-full h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-50 ${
          sedangMuat ? 'cursor-wait' : 'cursor-pointer'
        }`}
        style={{
          // Penskalaan gambar dengan transformasi CSS
          transform: `scale(${skala})`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {sedangMuat ? (
          // Tampilan loading
          <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : gagalMuat ? (
          // Tampilan error jika gambar gagal dimuat
          <div className="w-full h-full bg-red-100 flex justify-center items-center text-red-700 text-sm font-medium">
            <div className="text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div>Gagal Muat</div>
            </div>
          </div>
        ) : (
          // Tampilan gambar utama dengan ukuran yang konsisten
          <img
            src={gambarDipakai}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt={`Gambar ${sumber.penanda}`}
            className="w-full h-full object-cover"
          />
        )}
      </button>
      
      {/* Tombol reset skala untuk setiap gambar */}
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

// Komponen utama aplikasi
export default function App() {
  // State untuk lebar jendela, digunakan untuk responsivitas
  const [lebarJendela, setLebarJendela] = useState(window.innerWidth);

  // Efek samping untuk memperbarui lebar jendela saat diubah ukurannya
  useEffect(() => {
    const handleResize = () => {
      setLebarJendela(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menghitung ukuran sel gambar yang seragam berdasarkan lebar jendela
  const ukuranSel = Math.floor((lebarJendela * 0.8) / 3) - 16; // 80% dari lebar layar dibagi 3, dikurangi margin
  const ukuranSelMinimal = Math.max(ukuranSel, 120); // Minimal 120px

  // Fungsi untuk merender grid gambar dengan ukuran yang konsisten
  const renderGrid = () => {
    const grid: JSX.Element[] = [];
    // Membuat 3 baris
    for (let i = 0; i < 3; i++) {
      // Mengambil 3 item gambar untuk setiap baris
      const baris = GAMBAR_DATA.slice(i * 3, i * 3 + 3);
      grid.push(
        // Grid container dengan gap yang konsisten
        <div key={i} className="flex flex-row gap-4 mb-4 justify-center">
          {baris.map(item => (
            // Wrapper untuk setiap kotak gambar dengan ukuran yang sama dan eksplisit
            <div
              key={item.penanda}
              className="flex-shrink-0"
              style={{
                // Ukuran sel gambar yang seragam dan eksplisit
                width: `${ukuranSelMinimal}px`,
                height: `${ukuranSelMinimal}px`,
              }}
            >
              <GambarInteraktif sumber={item} />
            </div>
          ))}
        </div>
      );
    }
    return grid;
  };

  return (
    // Container utama dengan font Inter
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      
      {/* Judul aplikasi */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 mt-4 text-center">
        Galeri Gambar Interaktif
      </h1>
      
      {/* Container grid dengan ukuran yang responsif */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          {renderGrid()}
        </div>
      </div>
      
      {/* Instruksi penggunaan */}
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
