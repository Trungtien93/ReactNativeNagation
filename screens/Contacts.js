import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../utils/api';
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from '../store';
import ContactListItem from '../components/ContactListItem';

const keyExtractor = (item) => item.phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state);

  // Load data
  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
  .then((contacts) => {
    console.log('Fetched contacts:', contacts); // 👈 THÊM DÒNG NÀY
    const validContacts = contacts.filter(
      (contact) => contact.name && typeof contact.name === 'string'
    );
    dispatch(fetchContactsSuccess(validContacts));
  })

      .catch((error) => {
        console.error('Error fetching contacts:', error);
        dispatch(fetchContactsError());
      });
  }, [dispatch]);

  // Sort contacts
  const contactsSorted = contacts
    .slice()
    .filter((contact) => contact.name && typeof contact.name === 'string') // Lọc dữ liệu hợp lệ
    .sort((a, b) => a.name.localeCompare(b.name));

  // Render contact item
  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  // Render
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text style={styles.errorText}>Error loading contacts...</Text>}
      {!loading && !error && contactsSorted.length === 0 && (
        <Text style={styles.emptyText}>No contacts available.</Text>
      )}
      {!loading && !error && contactsSorted.length > 0 && (
        <FlatList
          data={contactsSorted}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Contacts;