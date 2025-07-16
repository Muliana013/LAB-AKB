import React, { useState, useEffect } from 'react';

// Data gambar yang akan ditampilkan - menggunakan URL yang lebih reliable
const IMAGE_DATA = [
  {
    id: 1,
    original: 'https://picsum.photos/300/300?random=1',
    placeholder: 'https://placehold.co/300x300/FF5733/FFFFFF?text=Placeholder+1',
  },
  {
    id: 2,
    original: 'https://picsum.photos/300/300?random=2',
    placeholder: 'https://placehold.co/300x300/33FF57/FFFFFF?text=Placeholder+2',
  },
  {
    id: 3,
    original: 'https://picsum.photos/300/300?random=3',
    placeholder: 'https://placehold.co/300x300/3357FF/FFFFFF?text=Placeholder+3',
  },
  {
    id: 4,
    original: 'https://picsum.photos/300/300?random=4',
    placeholder: 'https://placehold.co/300x300/FF33A1/FFFFFF?text=Placeholder+4',
  },
  {
    id: 5,
    original: 'https://picsum.photos/300/300?random=5',
    placeholder: 'https://placehold.co/300x300/A1FF33/FFFFFF?text=Placeholder+5',
  },
  {
    id: 6,
    original: 'https://picsum.photos/300/300?random=6',
    placeholder: 'https://placehold.co/300x300/33A1FF/FFFFFF?text=Placeholder+6',
  },
  {
    id: 7,
    original: 'https://picsum.photos/300/300?random=7',
    placeholder: 'https://placehold.co/300x300/FF3333/FFFFFF?text=Placeholder+7',
  },
  {
    id: 8,
    original: 'https://picsum.photos/300/300?random=8',
    placeholder: 'https://placehold.co/300x300/33FF33/FFFFFF?text=Placeholder+8',
  },
  {
    id: 9,
    original: 'https://picsum.photos/300/300?random=9',
    placeholder: 'https://placehold.co/300x300/3333FF/FFFFFF?text=Placeholder+9',
  },
];

// Tipe data untuk properti gambar
type ImageData = {
  id: number;
  original: string;
  placeholder: string;
};

// Komponen ImageInteractive untuk setiap gambar di grid
const ImageInteractive = ({ 
  data, 
  scale, 
  onUpdateScale 
}: { 
  data: ImageData; 
  scale: number; 
  onUpdateScale: (id: number, scale: number) => void; 
}) => {
  // State untuk menentukan apakah menggunakan gambar placeholder
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  // State untuk menandai apakah gambar gagal dimuat
  const [loadFailed, setLoadFailed] = useState(false);
  // State untuk loading
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mereset skala gambar ke 1
  const resetScale = () => {
    onUpdateScale(data.id, 1);
  };

  // Fungsi yang dipanggil saat gambar diklik
  const handleClick = () => {
    // Jika gambar sudah gagal dimuat atau masih loading, jangan lakukan apa-apa
    if (loadFailed || loading) return;
    
    // Logika penskalaan gambar dengan pembatasan maksimum 2x
    let newScale: number;
    if (scale >= 2) {
      // Jika sudah mencapai skala maksimum, reset ke 1
      newScale = 1;
    } else {
      // Perbesar skala sebesar 1.2x dengan batas maksimum 2x
      newScale = Math.min(scale * 1.2, 2);
    }
    
    // Update skala melalui callback ke parent component
    onUpdateScale(data.id, newScale);
    
    // Fungsionalitas perubahan gambar ke versi placeholder saat diklik
    setUsePlaceholder(prev => !prev);
  };

  // Handler untuk ketika gambar berhasil dimuat
  const handleImageLoad = () => {
    setLoading(false);
    setLoadFailed(false);
  };

  // Handler untuk ketika gambar gagal dimuat
  const handleImageError = () => {
    setLoading(false);
    setLoadFailed(true);
  };

  // Tentukan URL gambar yang akan digunakan (original atau placeholder)
  const imageUrl = usePlaceholder ? data.placeholder : data.original;

  return (
    // Container dengan ukuran yang konsisten dan sama untuk semua sel gambar
    <div className="w-full h-full flex flex-col">
      {/* Tombol/area yang bisa diklik untuk interaksi gambar */}
      <button
        onClick={handleClick}
        disabled={loading}
        className={`w-full h-full rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gray-50 ${
          loading ? 'cursor-wait' : 'cursor-pointer'
        }`}
        style={{
          // Penskalaan gambar dengan transformasi CSS
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {loading ? (
          // Tampilan loading
          <div className="w-full h-full bg-gray-200 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : loadFailed ? (
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
            src={imageUrl}
            onLoad={handleImageLoad}
            onError={handleImageError}
            alt={`Gambar ${data.id}`}
            className="w-full h-full object-cover"
          />
        )}
      </button>
      
      {/* Tombol reset skala untuk setiap gambar */}
      {scale > 1 && (
        <button
          onClick={resetScale}
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State global untuk mengelola skala semua gambar
  const [imageScales, setImageScales] = useState<{[key: number]: number}>(
    // Inisialisasi skala untuk semua gambar dengan nilai 1
    IMAGE_DATA.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {} as {[key: number]: number})
  );

  // Efek samping untuk memperbarui lebar jendela saat diubah ukurannya
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fungsi untuk mengupdate skala gambar individual
  const updateImageScale = (id: number, scale: number) => {
    setImageScales(prev => ({
      ...prev,
      [id]: scale
    }));
  };

  // Fungsi untuk mereset semua skala gambar ke 1
  const resetAllScales = () => {
    setImageScales(
      IMAGE_DATA.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {} as {[key: number]: number})
    );
  };

  // Menghitung ukuran sel gambar yang seragam berdasarkan lebar jendela
  const cellSize = Math.floor((windowWidth * 0.8) / 3) - 16; // 80% dari lebar layar dibagi 3, dikurangi margin
  const minCellSize = Math.max(cellSize, 120); // Minimal 120px

  // Fungsi untuk merender grid gambar dengan uk
