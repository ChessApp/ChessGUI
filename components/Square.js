import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Square = props => {
  return (
    <View>
      <View style={{...styles.square, ...props.style}}>
        <Text style={{...styles.squareTitle, ...props.color}}>{props.title}</Text>
      </View>
    </View>
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
