import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DATA_GAMBAR = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  utama: `https://picsum.photos/seed/utama${index}/200`,
  cadangan: `https://picsum.photos/seed/cadangan${index}/200`,
}));

const KotakGambar = ({ utama, cadangan }: { utama: string; cadangan: string }) => {
  const [pakaiCadangan, setPakaiCadangan] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [gagal, setGagal] = useState(false);

  const gambar = pakaiCadangan ? cadangan : utama;

  const saatTekan = () => {
    if (gagal) return;
    setPakaiCadangan(!pakaiCadangan);
    setZoom((lama) => Math.min(lama * 1.2, 2));
  };

  return (
    <TouchableOpacity style={styles.kotak} onPress={saatTekan}>
      {gagal ? (
        <View style={styles.gagalBox}>
          <Text style={styles.teksGagal}>X</Text>
        </View>
      ) : (
        <Image
          source={{ uri: gambar }}
          onError={() => setGagal(true)}
          style={[styles.gambar, { transform: [{ scale: zoom }] }]}
        />
      )}
    </TouchableOpacity>
  );
};

const GridGambarEksplisit = () => {
  // Bagi 3x3 secara manual
  const baris = [
    DATA_GAMBAR.slice(0, 3),
    DATA_GAMBAR.slice(3, 6),
    DATA_GAMBAR.slice(6, 9),
  ];

  return (
    <SafeAreaView style={styles.latar}>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {baris.map((kolom, barisIndex) => (
          <View key={barisIndex} style={styles.baris}>
            {kolom.map((item) => (
              <KotakGambar
                key={item.id}
                utama={item.utama}
                cadangan={item.cadangan}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GridGambarEksplisit;

const styles = StyleSheet.create({
  latar: {
    flex: 1,
    backgroundColor: "#111",
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  baris: {
    flexDirection: "row",
    marginBottom: 10,
  },
  kotak: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  gambar: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  gagalBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  teksGagal: {
    color: "#fff",
    fontSize: 16,
  },
});
