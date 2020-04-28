import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Square from './components/Square'

export default function App() {
  return (
    <View style={{flexDirection: 'column', flex: 64}}>
      <View style={styles.header}>
        <Text style={{padding: 75, color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>The Ol' War Game</Text>
      </View>
      <View style={styles.screen}>
        <Square title="R" style={styles.square} />
        <Square title="KN" />
        <Square title="B" style={styles.square} />
        <Square title="Q" />
        <Square title="K" style={styles.square} />
        <Square title="B" />
        <Square title="KN" style={styles.square} />
        <Square title="R" />
      </View>
      <View style={styles.screen}>
        <Square title="P" />
        <Square title="P" style={styles.square} />
        <Square title="P" />
        <Square title="P" style={styles.square} />
        <Square title="P" />
        <Square title="P" style={styles.square} />
        <Square title="P" />
        <Square title="P" style={styles.square} />
      </View>
      <View style={styles.screen}>
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
      </View>
      <View style={styles.screen}>
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
      </View>
      <View style={styles.screen}>
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
      </View>
      <View style={styles.screen}>
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
        <Square title="" />
        <Square title="" style={styles.square} />
      </View>
      <View style={styles.screen}>
        <Square title="P" style={styles.square} color={styles.name} />
        <Square title="P" color={styles.name} />
        <Square title="P" style={styles.square} color={styles.name} />
        <Square title="P" color={styles.name} />
        <Square title="P" style={styles.square} color={styles.name} />
        <Square title="P" color={styles.name} />
        <Square title="P" style={styles.square} color={styles.name} />
        <Square title="P" color={styles.name} />
      </View>
      <View style={styles.screen}>
        <Square title="R" color={styles.name} />
        <Square title="KN" style={styles.square} color={styles.name} />
        <Square title="B" color={styles.name} />
        <Square title="Q" style={styles.square} color={styles.name} />
        <Square title="K" color={styles.name} />
        <Square title="B" style={styles.square} color={styles.name} />
        <Square title="KN" color={styles.name} />
        <Square title="R" style={styles.square} color={styles.name} />
      </View>
      <View style={styles.header}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 65,
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
