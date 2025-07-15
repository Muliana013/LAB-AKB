import React, { useState, useEffect } from 'react';

// Data gambar yang akan ditampilkan
const GAMBAR_DATA = [
  {
    penanda: 1,
    asli: 'https://i.pinimg.com/736x/05/c6/1e/05c61e341cdb3b673b072eeeaa2ebc8f.jpg',
    cadangan: 'https://placehold.co/300x300/FF5733/FFFFFF?text=Cadangan+1',
  },
  {
    penanda: 2,
    asli: 'https://i.pinimg.com/1200x/ee/29/35/ee293577f437e42cebe2029d65701b48.jpg',
    cadangan: 'https://placehold.co/300x300/33FF57/FFFFFF?text=Cadangan+2',
  },
  {
    penanda: 3,
    asli: 'https://i.pinimg.com/736x/25/96/c4/2596c41bd82af36ff7398c500145b67f.jpg',
    cadangan: 'https://placehold.co/300x300/3357FF/FFFFFF?text=Cadangan+3',
  },
  {
    penanda: 4,
    asli: 'https://i.pinimg.com/736x/37/b4/64/37b464725d77c22ac2365c3913c0830a.jpg',
    cadangan: 'https://placehold.co/300x300/FF33A1/FFFFFF?text=Cadangan+4',
  },
  {
    penanda: 5,
    asli: 'https://i.pinimg.com/736x/1a/24/97/1a24973a70046e304372c7e41aaca367.jpg',
    cadangan: 'https://placehold.co/300x300/A1FF33/FFFFFF?text=Cadangan+5',
  },
  {
    penanda: 6,
    asli: 'https://i.pinimg.com/736x/9e/24/7b/9e247bf3d1b2e2ef9b53c1114e3348bf.jpg',
    cadangan: 'https://placehold.co/300x300/33A1FF/FFFFFF?text=Cadangan+6',
  },
  {
    penanda: 7,
    asli: 'https://i.pinimg.com/736x/49/4c/31/494c31c6871a375c2d4196f8ccac6e11.jpg',
    cadangan: 'https://placehold.co/300x300/FF3333/FFFFFF?text=Cadangan+7',
  },
  {
    penanda: 8,
    asli: 'https://i.pinimg.com/736x/df/ea/40/dfea40b87c321e095560b726cb3f2b11.jpg',
    cadangan: 'https://placehold.co/300x300/33FF33/FFFFFF?text=Cadangan+8',
  },
  {
    penanda: 9,
    asli: 'https://i.pinimg.com/736x/e0/2e/17/e02e1780433be4095b53106ee687eb7e.jpg',
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
  // State untuk skala gambar saat diklik
  const [skala, setSkala] = useState(1);
  // State untuk menandai apakah gambar gagal dimuat
  const [gagalMuat, setGagalMuat] = useState(false);

  // Fungsi yang dipanggil saat gambar diklik
  const tekan = () => {
    // Jika gambar sudah gagal dimuat, jangan lakukan apa-apa
    if (gagalMuat) return;
    // Fungsionalitas perubahan gambar ke versi cadangan saat diklik
    setPakaiCadangan(prev => !prev);
    // Fungsionalitas scaling gambar sebesar 1.2x saat diklik
    // Pembatasan skala maksimum hingga 2x per gambar
    setSkala(prev => Math.min(prev * 1.2, 2));
  };

  // Tentukan URL gambar yang akan digunakan (asli atau cadangan)
  const gambarDipakai = pakaiCadangan ? sumber.cadangan : sumber.asli;

  return (
    // Tombol/area yang bisa diklik untuk interaksi gambar
    // Menggunakan kelas Tailwind untuk styling: flex-1, aspect-square, rounded-lg, overflow-hidden, dll.
    // Ini menggantikan StyleSheet.create pada React Native dan memastikan ukuran sel gambar yang seragam.
    <button
      onClick={tekan}
      className="flex-1 aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{
        // Setiap gambar harus diskalakan secara individual. State 'skala' berada di komponen ini.
        transform: `scale(${skala})`,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      {gagalMuat ? (
        // Tampilan error jika gambar gagal dimuat
        <div className="flex flex-1 bg-red-100 justify-center items-center rounded-lg text-red-700 text-sm font-medium">
          Gagal Muat
        </div>
      ) : (
        // Tampilan gambar utama
        <img
          src={gambarDipakai}
          // Handler error jika gambar tidak bisa dimuat
          onError={() => setGagalMuat(true)}
          alt={`Gambar ${sumber.penanda}`}
          className="w-full h-full object-cover rounded-lg"
        />
      )}
    </button>
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

  // Fungsi untuk merender grid gambar
  const renderGrid = () => {
    const grid: JSX.Element[] = [];
    // Membuat 3 baris
    for (let i = 0; i < 3; i++) {
      // Mengambil 3 item gambar untuk setiap baris
      const baris = GAMBAR_DATA.slice(i * 3, i * 3 + 3);
      grid.push(
        // Menggunakan flexbox dan margin untuk tata letak baris
        <div key={i} className="flex flex-row mb-2 sm:mb-4 justify-center">
          {baris.map(item => (
            // Wrapper untuk setiap kotak gambar dengan ukuran responsif
            // Ukuran sel gambar yang sama untuk semua gambar diatur di sini
            <div
              key={item.penanda}
              className="mx-1 sm:mx-2 flex-shrink-0"
              style={{
                // Ukuran kotak responsif: 1/3 dari lebar layar minus margin
                // Ini memastikan ukuran sel gambar yang seragam dan responsif
                width: lebarJendela / 3 - (lebarJendela < 640 ? 8 : 16), // 8px untuk mobile, 16px untuk sm+
                height: lebarJendela / 3 - (lebarJendela < 640 ? 8 : 16),
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
    // Container utama dengan gaya latar belakang dan font Inter
    // Menggantikan SafeAreaView dan StyleSheet.create.
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-inter">
      {/* Script untuk memuat Tailwind CSS */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Konfigurasi Tailwind CSS untuk font Inter */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      {/* Judul aplikasi */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 mt-4 text-center">
        Galeri Gambar Interaktif
      </h1>
      {/* ScrollView yang diadaptasi menjadi div dengan overflow-y-auto */}
      <div className="w-full max-w-4xl overflow-y-auto p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          {renderGrid()}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-6 text-center">
        Klik pada gambar untuk melihat versi cadangan dan memperbesar!
      </p>
    </div>
  );
}
