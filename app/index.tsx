import React, { ComponentProps } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

// --- Tipe Data ---

type IconData = {
  nama: string;
  sumber: keyof typeof IconSources;
  warna: string;
};

type ItemIkonProps = {
  data: IconData;
};

// --- Pustaka Ikon ---

const IconSources = {
  FontAwesome: (props: ComponentProps<typeof FontAwesome>) => <FontAwesome {...props} />,
  Ionicons: (props: ComponentProps<typeof Ionicons>) => <Ionicons {...props} />,
  MaterialCommunityIcons: (props: ComponentProps<typeof MaterialCommunityIcons>) => <MaterialCommunityIcons {...props} />,
  Feather: (props: ComponentProps<typeof Feather>) => <Feather {...props} />,
  AntDesign: (props: ComponentProps<typeof AntDesign>) => <AntDesign {...props} />,
};

// --- Data Ikon ---

const IKON_LIST: IconData[] = [
  { nama: 'rocket', sumber: 'FontAwesome', warna: '#ff4757' },
  { nama: 'planet', sumber: 'Ionicons', warna: '#ffa502' },
  { nama: 'space-station', sumber: 'MaterialCommunityIcons', warna: '#747d8c' },
  { nama: 'git-branch', sumber: 'Feather', warna: '#2ed573' },
  { nama: 'codesquare', sumber: 'AntDesign', warna: '#1e90ff' },
  { nama: 'heart', sumber: 'FontAwesome', warna: '#ff6b81' },
  { nama: 'game-controller', sumber: 'Ionicons', warna: '#5352ed' },
  { nama: 'coffee', sumber: 'Feather', warna: '#834d18' },
  { nama: 'android', sumber: 'MaterialCommunityIcons', warna: '#a0d243' },
  { nama: 'apple1', sumber: 'AntDesign', warna: '#ced6e0' },
];

// --- Komponen Kartu Ikon ---

const ItemIkon = ({ data }: ItemIkonProps) => {
  const KomponenIkon = IconSources[data.sumber];

  return (
    <View style={styles.card}>
      <KomponenIkon name={data.nama as any} size={44} color={data.warna} />
      <Text style={styles.label}>{data.nama}</Text>
      <Text style={styles.library}>{data.sumber}</Text>
    </View>
  );
};

// --- Komponen Utama ---

export default function GaleriIkon() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Koleksi Ikon</Text>
          <Text style={styles.subtitle}>Berbagai macam ikon dari berbagai pustaka</Text>
        </View>
        <View style={styles.grid}>
          {IKON_LIST.map((item, idx) => (
            <ItemIkon key={idx} data={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Gaya ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#1c1c1c',
    padding: 18,
    margin: 6,
    borderRadius: 14,
    width: '42%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#2f2f2f',
  },
  label: {
    marginTop: 10,
    color: '#f1f1f1',
    fontSize: 15,
    fontWeight: '600',
  },
  library: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
});
