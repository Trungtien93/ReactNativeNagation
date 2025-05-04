import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

const ContactListItem = ({ name, avatar, phone, onPress }) => {
  // Default avatar fallback
  const defaultAvatar = 'https://via.placeholder.com/44'; // Replace with any default image URL

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        <Image
          style={styles.avatar}
          source={{
            uri: avatar || defaultAvatar,  // Use default if no avatar is passed
          }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

ContactListItem.defaultProps = {
  avatar: null, // Default avatar will be used if not provided
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: colors.blue,
    fontSize: 15,
    marginTop: 4,
  },
});

export default ContactListItem;
