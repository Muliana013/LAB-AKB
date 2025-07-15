import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";

// Daftar gambar dengan link utama dan cadangan
const GAMBAR_DATA = [
  {
    penanda: 1,
    asli: "https://i.pinimg.com/736x/05/c6/1e/05c61e341cdb3b673b072eeeaa2ebc8f.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+1",
  },
  {
    penanda: 2,
    asli: "https://i.pinimg.com/1200x/ee/29/35/ee293577f437e42cebe2029d65701b48.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+2",
  },
  {
    penanda: 3,
    asli: "https://i.pinimg.com/736x/25/96/c4/2596c41bd82af36ff7398c500145b67f.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+3",
  },
  {
    penanda: 4,
    asli: "https://i.pinimg.com/736x/37/b4/64/37b464725d77c22ac2365c3913c0830a.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+4",
  },
  {
    penanda: 5,
    asli: "https://i.pinimg.com/736x/1a/24/97/1a24973a70046e304372c7e41aaca367.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+5",
  },
  {
    penanda: 6,
    asli: "https://i.pinimg.com/736x/9e/24/7b/9e247bf3d1b2e2ef9b53c1114e3348bf.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+6",
  },
  {
    penanda: 7,
    asli: "https://i.pinimg.com/736x/49/4c/31/494c31c6871a375c2d4196f8ccac6e11.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+7",
  },
  {
    penanda: 8,
    asli: "https://i.pinimg.com/736x/df/ea/40/dfea40b87c321e095560b726cb3f2b11.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+8",
  },
  {
    penanda: 9,
    asli: "https://i.pinimg.com/736x/e0/2e/17/e02e1780433be4095b53106ee687eb7e.jpg",
    cadangan: "https://via.placeholder.com/300x300.png?text=Cadangan+9",
  },
];

// Tipe data untuk gambar
type DataGambar = {
  penanda: number;
  asli: string;
  cadangan: string;
};

// Komponen gambar interaktif
const GambarInteraktif = ({ sumber }: { sumber: DataGambar }) => {
  const [pakaiCadangan, setPakaiCadangan] = useState(false);
  const [skala, setSkala] = useState(1);
  const [gagalMuat, setGagalMuat] = useState(false);

  // Saat gambar ditekan: ubah gambar + tingkatkan skala
  const tekan = () => {
    if (gagalMuat) return;
    setPakaiCadangan((prev) => !prev);
    setSkala((prev) => Math.min(prev * 1.2, 2)); // batas maksimal skala 2x
  };

  const gambarDipakai = pakaiCadangan ? sumber.cadangan : sumber.asli;

  return (
    <TouchableOpacity onPress={tekan} style={gaya.kotakGambar}>
      {gagalMuat ? (
        <View style={gaya.tampilanError}>
          <Text style={gaya.tulisanError}>Gagal</Text>
        </View>
      ) : (
        <>
          <Image
            source={{ uri: gambarDipakai }}
            onError={() => setGagalMuat(true)}
            style={[gaya.gambar, { transform: [{ scale: skala }] }]}
          />
          {/* Label skala */}
          <View style={gaya.labelSkala}>
            <Text style={gaya.teksSkala}>x{skala.toFixed(1)}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

// Komponen utama
export default function Grid3x3Tetap() {
  const lebar = Dimensions.get("window").width;
  const ukuranKotak = lebar / 3 - 6;

  const baris1 = GAMBAR_DATA.slice(0, 3);
  const baris2 = GAMBAR_DATA.slice(3, 6);
  const baris3 = GAMBAR_DATA.slice(6, 9);

  const renderBaris = (data: DataGambar[]) => (
    <View style={gaya.baris}>
      {data.map((item) => (
        <View
          key={item.penanda}
          style={[gaya.kotakWrapper, { width: ukuranKotak, height: ukuranKotak }]}
        >
          <GambarInteraktif sumber={item} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={gaya.latar}>
      <ScrollView contentContainerStyle={gaya.kontainer}>
        {renderBaris(baris1)}
        {renderBaris(baris2)}
        {renderBaris(baris3)}
      </ScrollView>
    </SafeAreaView>
  );
}

// Style
const gaya = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  kontainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  baris: {
    flexDirection: "row",
    marginBottom: 6,
  },
  kotakWrapper: {
    marginHorizontal: 3,
  },
  kotakGambar: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  gambar: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  tampilanError: {
    flex: 1,
    backgroundColor: "#ffeeee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  tulisanError: {
    color: "#aa0000",
    fontSize: 12,
  },
  labelSkala: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  teksSkala: {
    color: "white",
    fontSize: 12,
  },
});
