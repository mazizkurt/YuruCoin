import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import YeniHomeScreen from '../screens/YeniHomeScreen';
import ProfilScreen from '../screens/ProfilScreen';
import NasilKazanirimScreen from '../screens/NasilKazanirimScreen';
import SozlesmeScreen from '../screens/SozlesmeScreen';
import HakkimizdaScreen from '../screens/HakkimizdaScreen';
const HomeStack = createSwitchNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  header:null
};
const YeniHomeStack = createSwitchNavigator({
  Yeni: YeniHomeScreen,
});

HomeStack.navigationOptions = {
  header:null
};
const LoadingStack = createSwitchNavigator({
  Loading: LoadingScreen,
});

LoadingStack.navigationOptions = {
  header:null
};
const ProfilStack = createSwitchNavigator({
  Profil: ProfilScreen,
});

ProfilStack.navigationOptions = {
  header:null
};
const NasilKazanirimStack = createSwitchNavigator({
  NasilKazanirim: NasilKazanirimScreen,
});

NasilKazanirimStack.navigationOptions = {
  header:null
};
const SozlesmeStack = createSwitchNavigator({
  Sozlesme: SozlesmeScreen,
});

SozlesmeStack.navigationOptions = {
  header:null
};
const HakkimizdaStack = createSwitchNavigator({
  Hakkimizda: HakkimizdaScreen,
});

HakkimizdaStack.navigationOptions = {
  header:null
};




export default createStackNavigator({
  LoadingStack,
  YeniHomeStack,
  ProfilStack,
  NasilKazanirimStack,
  SozlesmeStack,
  HakkimizdaStack

},{
  navigationOptions:{
    header:null,
    
  },
  headerMode: 'none',
  initialRouteName:'LoadingStack'
});
