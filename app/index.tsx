import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SISI_GRID = 3;
const TOTAL_ITEM = 9;
const LEBAR_LAYAR = Dimensions.get("window").width;
const UKURAN_KOTAK = Math.floor(LEBAR_LAYAR / SISI_GRID);

// Buat array gambar utama dan cadangan
const daftarGambar = Array.from({ length: TOTAL_ITEM }, (_, index) => ({
  id: index,
  gambarUtama: `https://picsum.photos/seed/gambar${index}/200`,
  gambarCadangan: `https://picsum.photos/seed/cadangan${index}/200`,
}));

const KotakGambar = ({
  sumber,
}: {
  sumber: { gambarUtama: string; gambarCadangan: string };
}) => {
  const [pakaiCadangan, setPakaiCadangan] = useState(false);
  const [skala, setSkala] = useState(1);
  const [gagal, setGagal] = useState(false);

  const urlSaatIni = pakaiCadangan ? sumber.gambarCadangan : sumber.gambarUtama;

  const saatKlik = () => {
    if (gagal) return;

    setPakaiCadangan((nilaiSebelumnya) => !nilaiSebelumnya);
    setSkala((nilaiLama) => Math.min(nilaiLama * 1.2, 2));
  };

  return (
    <TouchableOpacity onPress={saatKlik} style={gaya.bingkaiKotak}>
      {gagal ? (
        <View style={gaya.kotakError}>
          <Text style={gaya.teksGagal}>X</Text>
        </View>
      ) : (
        <Image
          source={{ uri: urlSaatIni }}
          style={[gaya.gambar, { transform: [{ scale: skala }] }]}
          onError={() => setGagal(true)}
        />
      )}
    </TouchableOpacity>
  );
};

const GaleriGrid = () => {
  return (
    <SafeAreaView style={gaya.latar}>
      <ScrollView contentContainerStyle={gaya.kontainerGrid}>
        {daftarGambar.map((item) => (
          <KotakGambar key={item.id} sumber={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GaleriGrid;

const gaya = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: "#121212",
  },
  kontainerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  bingkaiKotak: {
    width: UKURAN_KOTAK,
    height: UKURAN_KOTAK,
    padding: 2,
  },
  gambar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  kotakError: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3a3a3a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  teksGagal: {
    color: "#ccc",
    fontSize: 18,
  },
});
