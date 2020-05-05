import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "react-navigation-stack";
import AnimatedLoader from 'react-native-animated-loader';


const PostLoadScreen = props => {

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>The server is validating your move! This should only take a few moments...</Text>
      </View>
      <View style={{flex: 1}}>
        <AnimatedLoader visible={true} animationStyle={styles.lottie}/>
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

export default PostLoadScreen;
