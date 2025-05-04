import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';
import { fetchUserContact } from '../utils/api';

const User = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Thêm icon bánh răng vào header từ trong component
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="settings"
          size={24}
          style={{ color: 'white', marginRight: 10 }}
          onPress={() => navigation.navigate('Options')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchUserContact()
      .then((userData) => {
        setUser(userData);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading user data...</Text>
      </View>
    );
  }

  const { name, phone, picture } = user || {};
  const fullName = name ? `${name.title} ${name.first} ${name.last}` : 'No Name';
  const avatarUrl = picture?.large || 'https://via.placeholder.com/90';

  return (
    <View style={styles.container}>
      <ContactThumbnail
        avatar={avatarUrl}
        name={fullName}
        phone={phone || 'No Phone'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  errorText: {
    color: colors.white,
    marginBottom: 10,
  },
});

export default User;
