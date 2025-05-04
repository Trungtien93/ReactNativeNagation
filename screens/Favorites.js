import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../utils/api';
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from '../store';
import ContactThumbnail from '../components/ContactThumbnail';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

  // Load data
  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((contacts) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch(() => {
        dispatch(fetchContactsError());
      });
  }, [dispatch]);

  // Lọc các liên hệ yêu thích
  const favorites = contacts.filter((contact) => contact.favorite);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        name={item.name}
        phone={item.phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error loading favorites...</Text>}
      {!loading && !error && favorites.length === 0 && (
        <Text>No favorites found.</Text>
      )}
      {!loading && !error && favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;
