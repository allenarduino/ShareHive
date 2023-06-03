import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 35,
        backgroundColor: 'rgb(95, 32, 155)',
      }}>
      <Icon name="add" color="#fff" size={26} />
    </View>
  );
};

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          zIndex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          textAlign: 'center',
          //left: 20,
          //right: 20,
          //width: "90%",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height: 55,
        },
      }}
      mode="modal">
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: '',
          inactiveColor: 'black',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="home-outline"
                size={26}
                color={focused ? ' rgb(95, 32, 155)' : 'black'}
              />
              <Text
                style={{
                  color: `${focused ? 'rgb(95, 32, 155)' : 'black'}`,
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Users',
          activeColor: 'rgb(179, 7, 127)',
          inactiveColor: 'black',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="search-outline"
                size={26}
                color={focused ? ' rgb(95, 32, 155)' : 'black'}
              />
              <Text
                style={{
                  color: `${focused ? 'rgb(95, 32, 155)' : 'black'}`,
                  fontSize: 12,
                }}>
                Users
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
