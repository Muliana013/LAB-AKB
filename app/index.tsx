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

const MAIN_IMAGES = [
  'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
  'https://images.pexels.com/photos/672916/pexels-photo-672916.jpeg',
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg',
  'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
  'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
];

const ALT_IMAGES = [
  'https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg',
  'https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg',
  'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg',
  'https://images.pexels.com/photos/25284/pexels-photo-25284.jpg',
  'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg',
  'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
  'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg',
  'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg',
  'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg',
];

const IMAGE_LIST = MAIN_IMAGES.map((main, index) => ({
  id: index,
  main,
  alt: ALT_IMAGES[index],
}));

const GridImage = ({ item }) => {
  const [useAlt, setUseAlt] = useState(false);
  const [scale, setScale] = useState(1);

  const handlePress = () => {
    setUseAlt(!useAlt);
    setScale((prev) => {
      const next = prev * 1.2;
      return next <= 2 ? next : 2;
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.imageWrapper}>
      <Image
        source={{ uri: useAlt ? item.alt : item.main }}
        style={[styles.image, { transform: [{ scale }] }]}
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
              <GridImage item={item} />
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
  imageWrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
