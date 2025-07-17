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

// Membuat data gambar utama dan alternatif (9 pasang)
const DATA_GAMBAR = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  utama: `https://picsum.photos/seed/main${index}/200`,
  alternatif: `https://picsum.photos/seed/alt${index}/200`,
}));

type GambarTipe = {
  id: number;
  utama: string;
  alternatif: string;
};

const KotakGambar = ({ data }: { data: GambarTipe }) => {
  const [pakaiAlternatif, setPakaiAlternatif] = useState(false);
  const [skalaGambar, setSkalaGambar] = useState(1);
  const [gagalMuat, setGagalMuat] = useState(false);

  const saatDitekan = () => {
    if (gagalMuat) return;

    setPakaiAlternatif(!pakaiAlternatif);
    setSkalaGambar((sebelumnya) => Math.min(sebelumnya * 1.2, 2));
  };

  const urlGambar = pakaiAlternatif ? data.alternatif : data.utama;

  return (
    <TouchableOpacity onPress={saatDitekan} style={gaya.kotak}>
      {gagalMuat ? (
        <View style={gaya.tampilanGagal}>
          <Text style={gaya.teksGagal}>Tidak Bisa Dimuat</Text>
        </View>
      ) : (
        <Image
          source={{ uri: urlGambar }}
          style={[gaya.gambar, { transform: [{ scale: skalaGambar }] }]}
          onError={() => setGagalMuat(true)}
        />
      )}
    </TouchableOpacity>
  );
};

export default function GridGambarUtama() {
  return (
    <SafeAreaView style={gaya.latar}>
      <ScrollView>
        <View style={gaya.tataLetakGrid}>
          {DATA_GAMBAR.map((item) => (
            <KotakGambar key={item.id} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Mengatur ukuran sel berdasarkan lebar layar
const lebar = Dimensions.get("window").width;
const ukuran = lebar / 3;

const gaya = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: "#111",
  },
  tataLetakGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  kotak: {
    width: ukuran,
    height: ukuran,
    padding: 2,
  },
  gambar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  tampilanGagal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#555",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  teksGagal: {
    color: "#ccc",
    fontSize: 13,
  },
});
