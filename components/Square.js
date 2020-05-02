import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const Square = props => {

  var [pressed, setPressed] = useState(false);

  var [styleOverride, setStyleOverride] = useState(props.style);
  const onPress = () => {
    if( pressed ) {
      // setStyleOverride(props.style);
      setPressed(false);
    }
    else {
      // setStyleOverride({backgroundColor: 'red'});
      setPressed(true);
    }

    props.touchHandler(props.location);
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={{...styles.square, ...styleOverride}}>
        <Text style={{...styles.squareTitle, ...props.color}}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 47,
    height: 47,
    paddingTop: 0,
    backgroundColor: '#f7287b',
    borderColor: "#434343",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  squareTitle: {
    color: 'black',
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Square;
