import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "react-navigation-stack";

import Square from '../components/Square'

var init = false;
var count = 0;

const MainScreen = props => {

  var [touchInput, setTouchInput] = useState("");
  const touchInputHandler = input => {
    if( touchInput !== "" ) {
      input = touchInput.concat(",", input);
    }
    setTouchInput(input);
  }
  const clearTouchInput = () => {
    setTouchInput("");
  }
  
  const [enteredInput, setEnteredInput] = useState('');
  const inputHandler = inputText => {
    setEnteredInput(inputText);
  }

  const [enteredURL, setEnteredURL] = useState('');
  const urlHandler = inputURL => {
    setEnteredURL(inputURL);
  }

  var [pieceList, setPieceList] = useState([]);
  const addPieceHandler = (pieceName) => {
    setPieceList(pieceList => [...pieceList, pieceName]);
  }

  const clearPieceListHandler = () => {
    setPieceList(pieceList => {
      return pieceList.filter( () => false );
    })
  }

  var [colorList, setColorList] = useState([]);
  const addColorHandler = (color) => {
    setColorList(colorList => [...colorList, color]);
  }

  const clearColorListHandler = () => {
    setColorList(colorList => {
      return colorList.filter( () => false );
    })
  }

  var [turn, setTurn] = useState("");

  const sendInput = () => {
    props.navigation.navigate("post");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        loadXML();
        return this;
      }
    };
    xmlhttp.open("POST", "http://ec2-3-21-232-145.us-east-2.compute.amazonaws.com/index.php", true);
    var inputBase = "input=";
    xmlhttp.send(inputBase.concat(touchInput));
    Keyboard.dismiss();
    clearTouchInput();
  }

  const loadXMLWrapper = () => {
    props.navigation.navigate("get");
    loadXML();
  }

  var loadXML = () => {
    console.log("loadXML");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        readFresh(this);
        var turn = updateBoard(this);

        props.navigation.navigate("main");

        if( turn !== props.userTeam && props.userTeam !== "" ) {
          // The time delay seems to ensure that the loading animation
          // continually runs.
          setTimeout(() => { loadXMLWrapper(); }, 1000);
        }
        // Important for this to come after switching back to the main screen,
        // so it does not get clobbered on the switch. The delay seems to ensure
        // it does not get clobbered.
        setTimeout(() => { updateAlerts(this); }, 1000);
        
        return this;
      }
    };

    xmlhttp.open("GET", "http://ec2-3-21-232-145.us-east-2.compute.amazonaws.com/GameState.xml", true);
    xmlhttp.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
    xmlhttp.setRequestHeader('cache-control', 'max-age=0');
    xmlhttp.setRequestHeader('expires', '0');
    xmlhttp.setRequestHeader('expires', 'Tue, 01 Jan 1980 1:00:00 GMT');
    xmlhttp.setRequestHeader('pragma', 'no-cache');
    xmlhttp.send();
  }

  var readFresh = (xml) => {
    var x, i, xmlDoc, doc, txt;
    doc = xml.response;
    var DOMParser = require('xmldom').DOMParser;
    xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');
    txt = "";
    txt = xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue;
    xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue = "0";
    txt = xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue;
  }

  var updateBoard = (xml) => {
    clearPieceListHandler();
    clearColorListHandler();
    var doc = xml.response;
    var DOMParser = require('xmldom').DOMParser;
    var xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');

    var i;
    for(i=0; i<64; i++) {
      var piece = xmlDoc.childNodes[2].childNodes[11].childNodes[i*2 + 1].attributes[2].nodeValue;
      var color = xmlDoc.childNodes[2].childNodes[11].childNodes[i*2 + 1].attributes[3].nodeValue;

      addPieceHandler(piece);

      if( color == "B" ) {
        addColorHandler({color: 'black'});
      }
      else if( color == "W") {
        addColorHandler({color: 'white'});
      }
      else {
        addColorHandler({});
      }
    }

    var turn = xmlDoc.childNodes[2].childNodes[5].attributes[0].nodeValue;
    setTurn(turn);
    return turn;
  }

  const updateAlerts = xml => {
    var doc = xml.response;
    var DOMParser = require('xmldom').DOMParser;
    var xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');

    // If the invalidMove flag is set, then create an alert and pass the message
    // to it.
    if( xmlDoc.childNodes[2].childNodes[1].attributes[2].nodeValue == 1 ) {
      createMessageAlert(xmlDoc.childNodes[2].childNodes[9].attributes[0].nodeValue);
    }
  }

  const createMessageAlert = (message) => {
    Alert.alert(
      "Invalid Move",
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => console.log("OK pressed")
        }
      ],
      { cancelable: false }
    );
  }

  if( init == false ) {
    loadXMLWrapper();
    init = true;
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={{flexDirection: 'column', flex: 64}}>
        <View style={styles.header}>
          <Text style={{padding: 30, color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>The Ol' War Game</Text>
          <Text style={{padding: 0, color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>Courtesy of Booty and Sons</Text>
        </View>
        <View style={styles.header}>
          <TextInput
            style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 1}}
            onChangeText={urlHandler}
            value={enteredURL}
            placeholder={'paste server url here'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={loadXMLWrapper}
            title='GET'
          />
          <Button
            onPress={sendInput}
            title='POST'
          />
          <Text style={{height: 40, width: 60, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            {touchInput}
          </Text>
          <Button
            onPress={clearTouchInput}
            title='Clear Input'
          />
          <Text style={{height: 40, width: 60, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            Turn: {turn}
          </Text>
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[63]} color={colorList[63]} touchHandler={touchInputHandler} location="A8" style={styles.square} />
          <Square title={pieceList[62]} color={colorList[62]} touchHandler={touchInputHandler} location="B8" />
          <Square title={pieceList[61]} color={colorList[61]} touchHandler={touchInputHandler} location="C8" style={styles.square} />
          <Square title={pieceList[60]} color={colorList[60]} touchHandler={touchInputHandler} location="D8" />
          <Square title={pieceList[59]} color={colorList[59]} touchHandler={touchInputHandler} location="E8" style={styles.square} />
          <Square title={pieceList[58]} color={colorList[58]} touchHandler={touchInputHandler} location="F8" />
          <Square title={pieceList[57]} color={colorList[57]} touchHandler={touchInputHandler} location="G8" style={styles.square} />
          <Square title={pieceList[56]} color={colorList[56]} touchHandler={touchInputHandler} location="H8" />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[55]} color={colorList[55]} touchHandler={touchInputHandler} location="A7" />
          <Square title={pieceList[54]} color={colorList[54]} touchHandler={touchInputHandler} location="B7" style={styles.square} />
          <Square title={pieceList[53]} color={colorList[53]} touchHandler={touchInputHandler} location="C7" />
          <Square title={pieceList[52]} color={colorList[52]} touchHandler={touchInputHandler} location="D7" style={styles.square} />
          <Square title={pieceList[51]} color={colorList[51]} touchHandler={touchInputHandler} location="E7" />
          <Square title={pieceList[50]} color={colorList[50]} touchHandler={touchInputHandler} location="F7" style={styles.square} />
          <Square title={pieceList[49]} color={colorList[49]} touchHandler={touchInputHandler} location="G7" />
          <Square title={pieceList[48]} color={colorList[48]} touchHandler={touchInputHandler} location="H7" style={styles.square} />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[47]} color={colorList[47]} touchHandler={touchInputHandler} location="A6" style={styles.square} />
          <Square title={pieceList[46]} color={colorList[46]} touchHandler={touchInputHandler} location="B6" />
          <Square title={pieceList[45]} color={colorList[45]} touchHandler={touchInputHandler} location="C6" style={styles.square} />
          <Square title={pieceList[44]} color={colorList[44]} touchHandler={touchInputHandler} location="D6" />
          <Square title={pieceList[43]} color={colorList[43]} touchHandler={touchInputHandler} location="E6" style={styles.square} />
          <Square title={pieceList[42]} color={colorList[42]} touchHandler={touchInputHandler} location="F6" />
          <Square title={pieceList[41]} color={colorList[41]} touchHandler={touchInputHandler} location="G6" style={styles.square} />
          <Square title={pieceList[40]} color={colorList[40]} touchHandler={touchInputHandler} location="H6" />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[39]} color={colorList[39]} touchHandler={touchInputHandler} location="A5" />
          <Square title={pieceList[38]} color={colorList[38]} touchHandler={touchInputHandler} location="B5" style={styles.square} />
          <Square title={pieceList[37]} color={colorList[37]} touchHandler={touchInputHandler} location="C5" />
          <Square title={pieceList[36]} color={colorList[36]} touchHandler={touchInputHandler} location="D5" style={styles.square} />
          <Square title={pieceList[35]} color={colorList[35]} touchHandler={touchInputHandler} location="E5" />
          <Square title={pieceList[34]} color={colorList[34]} touchHandler={touchInputHandler} location="F5" style={styles.square} />
          <Square title={pieceList[33]} color={colorList[33]} touchHandler={touchInputHandler} location="G5" />
          <Square title={pieceList[32]} color={colorList[32]} touchHandler={touchInputHandler} location="H5" style={styles.square} />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[31]} color={colorList[31]} touchHandler={touchInputHandler} location="A4" style={styles.square} />
          <Square title={pieceList[30]} color={colorList[30]} touchHandler={touchInputHandler} location="B4" />
          <Square title={pieceList[29]} color={colorList[29]} touchHandler={touchInputHandler} location="C4" style={styles.square} />
          <Square title={pieceList[28]} color={colorList[28]} touchHandler={touchInputHandler} location="D4" />
          <Square title={pieceList[27]} color={colorList[27]} touchHandler={touchInputHandler} location="E4" style={styles.square} />
          <Square title={pieceList[26]} color={colorList[26]} touchHandler={touchInputHandler} location="F4" />
          <Square title={pieceList[25]} color={colorList[25]} touchHandler={touchInputHandler} location="G4" style={styles.square} />
          <Square title={pieceList[24]} color={colorList[24]} touchHandler={touchInputHandler} location="H4" />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[23]} color={colorList[23]} touchHandler={touchInputHandler} location="A3" />
          <Square title={pieceList[22]} color={colorList[22]} touchHandler={touchInputHandler} location="B3" style={styles.square} />
          <Square title={pieceList[21]} color={colorList[21]} touchHandler={touchInputHandler} location="C3" />
          <Square title={pieceList[20]} color={colorList[20]} touchHandler={touchInputHandler} location="D3" style={styles.square} />
          <Square title={pieceList[19]} color={colorList[19]} touchHandler={touchInputHandler} location="E3" />
          <Square title={pieceList[18]} color={colorList[18]} touchHandler={touchInputHandler} location="F3" style={styles.square} />
          <Square title={pieceList[17]} color={colorList[17]} touchHandler={touchInputHandler} location="G3" />
          <Square title={pieceList[16]} color={colorList[16]} touchHandler={touchInputHandler} location="H3" style={styles.square} />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[15]} color={colorList[15]} touchHandler={touchInputHandler} location="A2" style={styles.square} />
          <Square title={pieceList[14]} color={colorList[14]} touchHandler={touchInputHandler} location="B2" />
          <Square title={pieceList[13]} color={colorList[13]} touchHandler={touchInputHandler} location="C2" style={styles.square} />
          <Square title={pieceList[12]} color={colorList[12]} touchHandler={touchInputHandler} location="D2" />
          <Square title={pieceList[11]} color={colorList[11]} touchHandler={touchInputHandler} location="E2" style={styles.square} />
          <Square title={pieceList[10]} color={colorList[10]} touchHandler={touchInputHandler} location="F2" />
          <Square title={pieceList[9]}  color={colorList[9]}  touchHandler={touchInputHandler} location="G2" style={styles.square} />
          <Square title={pieceList[8]}  color={colorList[8]}  touchHandler={touchInputHandler} location="H2"  />
        </View>
        <View style={styles.screen}>
          <Square title={pieceList[7]} color={colorList[7]} touchHandler={touchInputHandler} location="A1" />
          <Square title={pieceList[6]} color={colorList[6]} touchHandler={touchInputHandler} location="B1" style={styles.square} />
          <Square title={pieceList[5]} color={colorList[5]} touchHandler={touchInputHandler} location="C1" />
          <Square title={pieceList[4]} color={colorList[4]} touchHandler={touchInputHandler} location="D1" style={styles.square} />
          <Square title={pieceList[3]} color={colorList[3]} touchHandler={touchInputHandler} location="E1" />
          <Square title={pieceList[2]} color={colorList[2]} touchHandler={touchInputHandler} location="F1" style={styles.square} />
          <Square title={pieceList[1]} color={colorList[1]} touchHandler={touchInputHandler} location="G1" />
          <Square title={pieceList[0]} color={colorList[0]} touchHandler={touchInputHandler} location="H1" style={styles.square} />
        </View>
        <View style={styles.header}/>
      </View>
    </TouchableWithoutFeedback>
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

export default MainScreen;
