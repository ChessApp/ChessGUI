import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "react-navigation-stack";
import AnimatedLoader from 'react-native-animated-loader';

const StartScreen = props => {

  const whiteHandler = () => {
    props.setTurn("W");
    props.navigation.navigate("main");
  }

  const blackHandler = () => {
    props.setTurn("B");
    props.navigation.navigate("main");
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex:1}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Choose a team</Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{height: 100, width: 100, flex: 1}}>
          <Button
            onPress={whiteHandler}
            title="White Team"
          />
        </View>
        <View style={{height: 100, width: 100, flex: 1}}>
          <Button
            onPress={blackHandler}
            title="Black Team"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300
  }
});

export default StartScreen;
