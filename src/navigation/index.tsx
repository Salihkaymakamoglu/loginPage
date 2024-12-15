import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./screens/loginPage";
import { Welcome } from "./screens/welcomePage";
import { StyleSheet, View } from "react-native";


export type RootStackParamList = {
  loginPage: undefined;
  Welcome: { name: string; surname: string };
};

type BottomTabParamList = {
  Login: undefined;
};

const LoginTabNavigator = () => {
  const BottomTab = createBottomTabNavigator<BottomTabParamList>();

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <BottomTab.Screen name="Login" component={Login} />
    </BottomTab.Navigator>
  );
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    
    <NavigationContainer 
    >
     
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        
      >
        <RootStack.Screen  name="loginPage" component={LoginTabNavigator} />

        <RootStack.Screen name="Welcome" component={Welcome} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff"
  }
})
export default AppNavigator;
