import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import colors from './utils/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const getDrawerItemIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={22} style={{ color }} />
);

const getTabBarIcon = (icon) => ({ color }) => (
  <MaterialIcons name={icon} size={26} style={{ color }} />
);

const ContactsScreens = () => (
  <Stack.Navigator
    initialRouteName="Contacts"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.blue },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name="Contacts"
      component={Contacts}
      options={{ title: 'Contacts' }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ route }) => {
        const { contact } = route.params;
        const { name } = contact;
        return {
          title: name.split(' ')[0],
        };
      }}
    />
  </Stack.Navigator>
);

const FavoritesScreens = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.blue },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{ title: 'Favorites' }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => (
  <Stack.Navigator
    initialRouteName="User"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.blue },
      headerTitleAlign: 'center',
    }}
  >
    <Stack.Screen
      name="User"
      component={User}
      options={{
        title: 'Me',
        headerRight: () => (
          <MaterialIcons
            name="settings"
            size={24}
            style={{ color: 'white', marginRight: 10 }}
            onPress={() => navigation.navigate('Options')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="Options"
      component={Options}
      options={{ title: 'Options' }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="ContactsScreens"
    barStyle={{ backgroundColor: colors.blue }}
    activeColor="white"
    inactiveColor="gray"
  >
    <Tab.Screen
      name="ContactsScreens"
      component={ContactsScreens}
      options={{
        tabBarIcon: getTabBarIcon('list'),
      }}
    />
    <Tab.Screen
      name="FavoritesScreens"
      component={FavoritesScreens}
      options={{
        tabBarIcon: getTabBarIcon('star'),
      }}
    />
    <Tab.Screen
      name="UserScreens"
      component={UserScreens}
      options={{
        tabBarIcon: getTabBarIcon('person'),
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          drawerIcon: getDrawerItemIcon('home'),
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="FavoritesScreens"
        component={FavoritesScreens}
        options={{
          drawerIcon: getDrawerItemIcon('star'),
        }}
      />
      <Drawer.Screen
        name="UserScreens"
        component={UserScreens}
        options={{
          drawerIcon: getDrawerItemIcon('person'),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default DrawerNavigator;