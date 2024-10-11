import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const SongItem = ({ song, onLikePress }) => (
  <View style={styles.songItem}>
    <Text>{song.id} - {song.title}</Text>
    <Text>Ca sĩ: {song.artist}</Text>
    <TouchableOpacity onPress={() => onLikePress(song)}>
      <Text>{song.isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  </View>
);

const OriginalSongsList = ({ songs, onLikePress }) => (
  <FlatList
    data={songs}
    renderItem={({ item }) => <SongItem song={item} onLikePress={onLikePress} />}
    keyExtractor={item => item.id}
  />
);

const FavoriteSongsList = ({ songs, onDislikePress }) => (
  <FlatList
    data={songs}
    renderItem={({ item }) => <SongItem song={item} onLikePress={onDislikePress} />}
    keyExtractor={item => item.id}
  />
);

const App = () => {
  const [originalSongs, setOriginalSongs] = useState([
    { id: '00001', title: 'Không qua được vòng luân hồi', artist: 'Silver Smoke Remix', isFavorite: false },
    { id: '00002', title: 'Unwelcome School', artist: 'Mitsukiyo', isFavorite: false },
    { id: '00003', title: 'Gods', artist: 'NewJeans', isFavorite: false },
    { id: '00004', title: 'Khát vọng tuổi trẻ (Remix)', artist: 'Tùng Dương, Japandee', isFavorite: false },
    { id: '00004', title: 'Faruzam Theme (Extended)', artist: 'Genshin impact, tnbee remix', isFavorite: false},
    { id: '00005', title: 'TAMADA (Japandee Remix)', artist: 'MiyaGi x Endshpil, Japandee'}
  ]);

  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const handleLikePress = (song) => {
    const updatedOriginalSongs = originalSongs.map(s => 
      s.id === song.id ? { ...s, isFavorite: true } : s
    );
    setOriginalSongs(updatedOriginalSongs);
    setFavoriteSongs([...favoriteSongs, { ...song, isFavorite: true }]);
  };

  const handleDislikePress = (song) => {
    const updatedFavoriteSongs = favoriteSongs.filter(s => s.id !== song.id);
    setFavoriteSongs(updatedFavoriteSongs);
    const updatedOriginalSongs = originalSongs.map(s => 
      s.id === song.id ? { ...s, isFavorite: false } : s
    );
    setOriginalSongs(updatedOriginalSongs);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Danh sách bài hát gốc">
          {() => <OriginalSongsList songs={originalSongs} onLikePress={handleLikePress} />}
        </Tab.Screen>
        <Tab.Screen name="Danh sách bài hát yêu thích">
          {() => <FavoriteSongsList songs={favoriteSongs} onDislikePress={handleDislikePress} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  songItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;