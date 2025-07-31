// app/index.tsx
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const signs = [
    {
      name: "ban",
      label: "Dilarang Masuk",
      caption:
        "Rambu ini menunjukkan bahwa kendaraan tidak diperkenankan melewati jalan ini dari arah Anda datang.",
    },
    {
      name: "road",
      label: "Satu Arah",
      caption:
        "Digunakan untuk menandai bahwa jalan hanya dapat dilalui ke satu arah saja.",
    },
    {
      name: "traffic-light",
      label: "Lampu Lalin",
      caption:
        "Patuhi urutan warna: Merah untuk berhenti, Kuning untuk bersiap, dan Hijau untuk jalan.",
    },
    {
      name: "walking",
      label: "Khusus Pejalan Kaki",
      caption:
        "Zona ini diprioritaskan untuk orang yang berjalan kaki. Kendaraan dilarang mengganggu jalur ini.",
    },
    {
      name: "bicycle",
      label: "Jalur Sepeda",
      caption:
        "Lintasan ini disediakan khusus bagi pesepeda demi keselamatan dan ketertiban.",
    },
    {
      name: "exclamation-triangle",
      label: "Area Bahaya",
      caption:
        "Tanda peringatan agar pengendara lebih waspada terhadap kondisi jalan yang berisiko.",
    },
    {
      name: "parking",
      label: "Tempat Parkir",
      caption:
        "Lokasi yang secara resmi diizinkan untuk kendaraan berhenti atau parkir.",
    },
    {
      name: "arrow-circle-up",
      label: "Hanya Lurus",
      caption:
        "Pengemudi diwajibkan untuk terus maju dan tidak berbelok pada titik ini.",
    },
    {
      name: "car",
      label: "Mobil",
      caption:
        "Rambu yang menandai jalur prioritas untuk kendaraan roda empat.",
    },
    {
      name: "bus",
      label: "Jalur Bus",
      caption: "Jalur ini hanya boleh dilalui oleh kendaraan umum seperti bus.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Simbol Rambu Lalu Lintas</Text>

      <View style={styles.grid}>
        {signs.map((sign, index) => (
          <View key={index} style={styles.card}>
            <FontAwesome5 name={sign.name} size={38} color="#b22222" />
            <Text style={styles.label}>{sign.label}</Text>
            <Text style={styles.caption}>{sign.caption}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 Muliana – 105841103822
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    alignItems: "center",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  caption: {
    fontSize: 13,
    color: "#555",
    marginTop: 6,
    textAlign: "center",
  },
  footer: {
    marginTop: 32,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
});
