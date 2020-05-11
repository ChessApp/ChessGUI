import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Square = props => {

  var [pressed, setPressed] = useState(false);

  var [styleOverride, setStyleOverride] = useState(props.style);
  const onPress = () => {
    if( pressed ) {
      setPressed(false);
    }
    else {
      setPressed(true);
    }

    props.touchHandler(props.location);
  }

  return (
    <View style={{...styles.square, ...styleOverride}}>
      <TouchableHighlight onPress={onPress} underlayColor='lawngreen' style={{width: '100%', height: '100%'}}>
        <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{...styles.squareTitle, ...props.color}}>{props.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: '12.5%',
    height: '100%',
    paddingTop: 0,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  squareTitle: {
    color: 'black',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Square;
