import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

// Gambar Hello Kitty (gunakan 9 gambar untuk grid 3x3)
const HELLO_KITTY_IMAGES = [
  'https://i.pinimg.com/736x/1a/24/97/1a24973a70046e304372c7e41aaca367.jpg',
  'https://i.pinimg.com/originals/5a/b1/93/5ab193449a1806a4a0ad199a4c812d06.jpg',
  'https://i.pinimg.com/originals/e5/e4/9a/e5e49a7332c2c9beebf2490205c97cb5.jpg',
  'https://i.pinimg.com/originals/f4/2c/88/f42c880826274e0bd501f2a12e3cf3f1.jpg',
  'https://i.pinimg.com/originals/38/ea/4e/38ea4e1e7a6aeb4f122eaa3d2f456e27.jpg',
  'https://i.pinimg.com/originals/f7/02/55/f7025525dd2806d002b40c1f281206c4.jpg',
  'https://i.pinimg.com/originals/c8/71/bf/c871bf47956b208f7026b73187c55709.jpg',
  'https://i.pinimg.com/originals/5a/ab/3f/5aab3f83ef2d9f8b59821b1f6d9d6e59.jpg',
  'https://i.pinimg.com/originals/90/dc/55/90dc556416e7fd22e8d876e3e5d4d3de.jpg',
];

// Gambar alternatif untuk flip
const ALT_IMAGES = [
  'https://i.pinimg.com/originals/2e/d7/87/2ed787da981511bbce6a3c204627c490.jpg',
  'https://i.pinimg.com/originals/ea/18/93/ea189340a6b3b86e08d3dfaff6b4ae60.jpg',
  'https://i.pinimg.com/originals/4e/e0/fb/4ee0fb5a28c2b36ef49a4f8f208c1c3f.jpg',
  'https://i.pinimg.com/originals/1a/b3/34/1ab3342adccdfec52a2f28204fa71c7e.jpg',
  'https://i.pinimg.com/originals/3a/80/37/3a8037d0f1c3b5e1ad67f3c1d7b5311e.jpg',
  'https://i.pinimg.com/originals/bb/32/88/bb3288e9a2dbcc729988b847938b1cd4.jpg',
  'https://i.pinimg.com/originals/f9/8f/67/f98f67c1938933482a08027b69aa3a8a.jpg',
  'https://i.pinimg.com/originals/f3/77/7b/f3777b3e8936d27b02a80261cd6b2b8a.jpg',
  'https://i.pinimg.com/originals/84/03/91/84039136b2962f2693efc26c36b400e5.jpg',
];

// Gabungkan jadi objek
const IMAGE_LIST = HELLO_KITTY_IMAGES.map((main, index) => ({
  id: index,
  main,
  alt: ALT_IMAGES[index],
}));

const GridImage = ({ item, size }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setUseAlt(!useAlt);
    setScale((prev) => (prev * 1.2 <= 2 ? prev * 1.2 : 2));
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ width: size, height: size }}>
      <Image
        source={{ uri: useAlt ? item.alt : item.main }}
        style={{
          width: '100%',
          height: '100%',
          transform: [{ scale }],
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const itemSize = screenWidth / 3 - 12;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.grid}>
          {IMAGE_LIST.map((item) => (
            <View key={item.id} style={[styles.gridItem, { width: itemSize, height: itemSize }]}>
              <GridImage item={item} size={itemSize} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    margin: 6,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
