import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Square from './Square'

const Board = props => {

  return (
    <View style={{height: '100%', width: '100%'}}>
      <View style={styles.row}>
        <Square title={props.pieceList[63]} color={props.colorList[63]} touchHandler={props.touchInputHandler} location="A8" style={styles.lightSquare} />
        <Square title={props.pieceList[62]} color={props.colorList[62]} touchHandler={props.touchInputHandler} location="B8" style={styles.darkSquare} />
        <Square title={props.pieceList[61]} color={props.colorList[61]} touchHandler={props.touchInputHandler} location="C8" style={styles.lightSquare} />
        <Square title={props.pieceList[60]} color={props.colorList[60]} touchHandler={props.touchInputHandler} location="D8" style={styles.darkSquare} />
        <Square title={props.pieceList[59]} color={props.colorList[59]} touchHandler={props.touchInputHandler} location="E8" style={styles.lightSquare} />
        <Square title={props.pieceList[58]} color={props.colorList[58]} touchHandler={props.touchInputHandler} location="F8" style={styles.darkSquare} />
        <Square title={props.pieceList[57]} color={props.colorList[57]} touchHandler={props.touchInputHandler} location="G8" style={styles.lightSquare} />
        <Square title={props.pieceList[56]} color={props.colorList[56]} touchHandler={props.touchInputHandler} location="H8" style={styles.darkSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[55]} color={props.colorList[55]} touchHandler={props.touchInputHandler} location="A7" style={styles.darkSquare} />
        <Square title={props.pieceList[54]} color={props.colorList[54]} touchHandler={props.touchInputHandler} location="B7" style={styles.lightSquare} />
        <Square title={props.pieceList[53]} color={props.colorList[53]} touchHandler={props.touchInputHandler} location="C7" style={styles.darkSquare} />
        <Square title={props.pieceList[52]} color={props.colorList[52]} touchHandler={props.touchInputHandler} location="D7" style={styles.lightSquare} />
        <Square title={props.pieceList[51]} color={props.colorList[51]} touchHandler={props.touchInputHandler} location="E7" style={styles.darkSquare} />
        <Square title={props.pieceList[50]} color={props.colorList[50]} touchHandler={props.touchInputHandler} location="F7" style={styles.lightSquare} />
        <Square title={props.pieceList[49]} color={props.colorList[49]} touchHandler={props.touchInputHandler} location="G7" style={styles.darkSquare} />
        <Square title={props.pieceList[48]} color={props.colorList[48]} touchHandler={props.touchInputHandler} location="H7" style={styles.lightSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[47]} color={props.colorList[47]} touchHandler={props.touchInputHandler} location="A6" style={styles.lightSquare} />
        <Square title={props.pieceList[46]} color={props.colorList[46]} touchHandler={props.touchInputHandler} location="B6" style={styles.darkSquare} />
        <Square title={props.pieceList[45]} color={props.colorList[45]} touchHandler={props.touchInputHandler} location="C6" style={styles.lightSquare} />
        <Square title={props.pieceList[44]} color={props.colorList[44]} touchHandler={props.touchInputHandler} location="D6" style={styles.darkSquare} />
        <Square title={props.pieceList[43]} color={props.colorList[43]} touchHandler={props.touchInputHandler} location="E6" style={styles.lightSquare} />
        <Square title={props.pieceList[42]} color={props.colorList[42]} touchHandler={props.touchInputHandler} location="F6" style={styles.darkSquare} />
        <Square title={props.pieceList[41]} color={props.colorList[41]} touchHandler={props.touchInputHandler} location="G6" style={styles.lightSquare} />
        <Square title={props.pieceList[40]} color={props.colorList[40]} touchHandler={props.touchInputHandler} location="H6" style={styles.darkSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[39]} color={props.colorList[39]} touchHandler={props.touchInputHandler} location="A5" style={styles.darkSquare} />
        <Square title={props.pieceList[38]} color={props.colorList[38]} touchHandler={props.touchInputHandler} location="B5" style={styles.lightSquare} />
        <Square title={props.pieceList[37]} color={props.colorList[37]} touchHandler={props.touchInputHandler} location="C5" style={styles.darkSquare} />
        <Square title={props.pieceList[36]} color={props.colorList[36]} touchHandler={props.touchInputHandler} location="D5" style={styles.lightSquare} />
        <Square title={props.pieceList[35]} color={props.colorList[35]} touchHandler={props.touchInputHandler} location="E5" style={styles.darkSquare} />
        <Square title={props.pieceList[34]} color={props.colorList[34]} touchHandler={props.touchInputHandler} location="F5" style={styles.lightSquare} />
        <Square title={props.pieceList[33]} color={props.colorList[33]} touchHandler={props.touchInputHandler} location="G5" style={styles.darkSquare} />
        <Square title={props.pieceList[32]} color={props.colorList[32]} touchHandler={props.touchInputHandler} location="H5" style={styles.lightSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[31]} color={props.colorList[31]} touchHandler={props.touchInputHandler} location="A4" style={styles.lightSquare} />
        <Square title={props.pieceList[30]} color={props.colorList[30]} touchHandler={props.touchInputHandler} location="B4" style={styles.darkSquare} />
        <Square title={props.pieceList[29]} color={props.colorList[29]} touchHandler={props.touchInputHandler} location="C4" style={styles.lightSquare} />
        <Square title={props.pieceList[28]} color={props.colorList[28]} touchHandler={props.touchInputHandler} location="D4" style={styles.darkSquare} />
        <Square title={props.pieceList[27]} color={props.colorList[27]} touchHandler={props.touchInputHandler} location="E4" style={styles.lightSquare} />
        <Square title={props.pieceList[26]} color={props.colorList[26]} touchHandler={props.touchInputHandler} location="F4" style={styles.darkSquare} />
        <Square title={props.pieceList[25]} color={props.colorList[25]} touchHandler={props.touchInputHandler} location="G4" style={styles.lightSquare} />
        <Square title={props.pieceList[24]} color={props.colorList[24]} touchHandler={props.touchInputHandler} location="H4" style={styles.darkSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[23]} color={props.colorList[23]} touchHandler={props.touchInputHandler} location="A3" style={styles.darkSquare} />
        <Square title={props.pieceList[22]} color={props.colorList[22]} touchHandler={props.touchInputHandler} location="B3" style={styles.lightSquare} />
        <Square title={props.pieceList[21]} color={props.colorList[21]} touchHandler={props.touchInputHandler} location="C3" style={styles.darkSquare} />
        <Square title={props.pieceList[20]} color={props.colorList[20]} touchHandler={props.touchInputHandler} location="D3" style={styles.lightSquare} />
        <Square title={props.pieceList[19]} color={props.colorList[19]} touchHandler={props.touchInputHandler} location="E3" style={styles.darkSquare} />
        <Square title={props.pieceList[18]} color={props.colorList[18]} touchHandler={props.touchInputHandler} location="F3" style={styles.lightSquare} />
        <Square title={props.pieceList[17]} color={props.colorList[17]} touchHandler={props.touchInputHandler} location="G3" style={styles.darkSquare} />
        <Square title={props.pieceList[16]} color={props.colorList[16]} touchHandler={props.touchInputHandler} location="H3" style={styles.lightSquare} />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[15]} color={props.colorList[15]} touchHandler={props.touchInputHandler} location="A2" style={styles.lightSquare} />
        <Square title={props.pieceList[14]} color={props.colorList[14]} touchHandler={props.touchInputHandler} location="B2" style={styles.darkSquare} />
        <Square title={props.pieceList[13]} color={props.colorList[13]} touchHandler={props.touchInputHandler} location="C2" style={styles.lightSquare} />
        <Square title={props.pieceList[12]} color={props.colorList[12]} touchHandler={props.touchInputHandler} location="D2" style={styles.darkSquare} />
        <Square title={props.pieceList[11]} color={props.colorList[11]} touchHandler={props.touchInputHandler} location="E2" style={styles.lightSquare} />
        <Square title={props.pieceList[10]} color={props.colorList[10]} touchHandler={props.touchInputHandler} location="F2" style={styles.darkSquare} />
        <Square title={props.pieceList[9]}  color={props.colorList[9]}  touchHandler={props.touchInputHandler} location="G2" style={styles.lightSquare} />
        <Square title={props.pieceList[8]}  color={props.colorList[8]}  touchHandler={props.touchInputHandler} location="H2" style={styles.darkSquare}  />
      </View>
      <View style={styles.row}>
        <Square title={props.pieceList[7]} color={props.colorList[7]} touchHandler={props.touchInputHandler} location="A1" style={styles.darkSquare} />
        <Square title={props.pieceList[6]} color={props.colorList[6]} touchHandler={props.touchInputHandler} location="B1" style={styles.lightSquare} />
        <Square title={props.pieceList[5]} color={props.colorList[5]} touchHandler={props.touchInputHandler} location="C1" style={styles.darkSquare} />
        <Square title={props.pieceList[4]} color={props.colorList[4]} touchHandler={props.touchInputHandler} location="D1" style={styles.lightSquare} />
        <Square title={props.pieceList[3]} color={props.colorList[3]} touchHandler={props.touchInputHandler} location="E1" style={styles.darkSquare} />
        <Square title={props.pieceList[2]} color={props.colorList[2]} touchHandler={props.touchInputHandler} location="F1" style={styles.lightSquare} />
        <Square title={props.pieceList[1]} color={props.colorList[1]} touchHandler={props.touchInputHandler} location="G1" style={styles.darkSquare} />
        <Square title={props.pieceList[0]} color={props.colorList[0]} touchHandler={props.touchInputHandler} location="H1" style={styles.lightSquare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightSquare: {
    height: '100%',
    width: '12.5%',
    backgroundColor: 'burlywood',
    borderColor: "saddlebrown",
    borderWidth: 1,
    justifyContent: 'center'
  },
  darkSquare: {
    height: '100%',
    width: '12.5%',
    backgroundColor: 'peru',
    borderColor: "saddlebrown",
    borderWidth: 1,
    justifyContent: 'center'
  },
  row: {
    height: '12.5%',
    width: '100%',
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'saddlebrown'
  },
  squareTitle: {
    color: 'black',
    fontSize: 28,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Board;
