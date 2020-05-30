import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';

whitePawn = require("../assets/WhitePawn.png");
blackPawn = require("../assets/BlackPawn.png");
whiteKnight = require("../assets/WhiteKnight.png");
blackKnight = require("../assets/BlackKnight.png");
whiteRook = require("../assets/WhiteRook.png");
blackRook = require("../assets/BlackRook.png");
whiteBishop = require("../assets/WhiteBishop.png");
blackBishop = require("../assets/BlackBishop.png");
whiteQueen = require("../assets/WhiteQueen.png");
blackQueen = require("../assets/BlackQueen.png");
whiteKing = require("../assets/WhiteKing.png");
blackKing = require("../assets/BlackKing.png");

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

  const [pieceIcon, setPieceIcon] = useState("");
  const getPieceIcon = () => {
      // setPieceIcon("../assets/WhitePawn.png");
      // console.log(props.title);
      if( props.color == "W" ) {
        if( props.title == "R" ) {
          return whiteRook;
        }
        else if( props.title == "P" ) {
          return whitePawn;
        }
        else if( props.title == "KN" ) {
          return whiteKnight;
        }
        else if( props.title == "B" ) {
          return whiteBishop;
        }
        else if( props.title == "Q" ) {
          return whiteQueen;
        }
        else if( props.title == "K" ) {
          return whiteKing;
        }
      }
      else if( props.color == "B" ) {
        if( props.title == "R" ) {
          return blackRook;
        }
        else if( props.title == "P" ) {
          return blackPawn;
        }
        else if( props.title == "KN" ) {
          return blackKnight;
        }
        else if( props.title == "B" ) {
          return blackBishop;
        }
        else if( props.title == "Q" ) {
          return blackQueen;
        }
        else if( props.title == "K" ) {
          return blackKing;
        }
      }
  }

  // var pieceIcon = "";

  return (
    <View style={{...styles.square, ...styleOverride}}>
      <TouchableHighlight onPress={onPress} underlayColor='lawngreen' style={{width: '100%', height: '100%'}}>
        <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{width: 42, height: 42}}
            source={getPieceIcon()}
            // source=getPieceIcon(props.title);
          />
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
