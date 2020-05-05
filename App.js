import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import StartScreen from "./screens/StartScreen"
import MainScreen from "./screens/MainScreen"
import PostLoadScreen from "./screens/PostLoadScreen"
import GetLoadScreen from "./screens/GetLoadScreen"

const Stack = createStackNavigator();
const ThemeContext = React.createContext("W");

export default function App() {

  const [playerTurn, setPlayerTurn] = useState("");
  const turnHandler = turn => {
    console.log("turnHandler");
    setPlayerTurn(turn);
  }

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="start">
            {props => <StartScreen {...props} setTurn={turnHandler} />}
          </Stack.Screen>
          <Stack.Screen name="main">
            {props => <MainScreen {...props} userTeam={playerTurn} />}
          </Stack.Screen>
          <Stack.Screen name="post"  component={PostLoadScreen}></Stack.Screen>
          <Stack.Screen name="get"   component={GetLoadScreen}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  screen2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  square: {
    backgroundColor: 'darkturquoise'
  },
  name: {
    color: 'white'
  }
});
