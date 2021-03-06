import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "react-navigation-stack";
import AnimatedLoader from 'react-native-animated-loader';

import Board from '../components/Board'

var init = false;
var count = 0;

const MainScreen = props => {

  var [touchInput, setTouchInput] = useState("");
  const touchInputHandler = input => {
    if( touchInput.length < 5 ) {
      if( touchInput !== "" ) {
        input = touchInput.concat(",", input);
      }
      setTouchInput(input);
    }
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
  const setTurnHandler = turn => {
    if( turn == "B" )
      turn = "Black";
    else
      turn = "White";

    setTurn(turn);
  }

  const sendInput = () => {
    if( touchInput.length !== 5 ) {
      console.log(touchInput);
      createMessageAlert("Invalid Input", "Incomplete input. Please press Clear Input and then press the source square, followed by the destination square.")
    }
    else {
      loaderVisibilityHandler(true, "Validating your move!");
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          loadXML();
          return this;
        }
      };
      xmlhttp.open("POST", "http://ec2-18-220-151-116.us-east-2.compute.amazonaws.com/index.php", true);
      var inputBase = "input=";
      xmlhttp.send(inputBase.concat(touchInput));
      Keyboard.dismiss();
      clearTouchInput();
    }
  }

  const loadXMLWrapper = () => {
    loaderVisibilityHandler(true, "Scanning the server for updates!");
    loadXML();
  }

  var loadXML = () => {
    console.log("loadXML");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        readFresh(this);
        var turn = updateBoard(this);

        loaderVisibilityHandler(false);

        if( turn !== props.userTeam && props.userTeam !== "" ) {
          // The time delay seems to ensure that the loading animation
          // continually runs.
          setTimeout(() => { loadXMLWrapper(); }, 250);
        }
        // Important for this to come after switching back to the main screen,
        // so it does not get clobbered on the switch. The delay seems to ensure
        // it does not get clobbered.
        setTimeout(() => { updateAlerts(this); }, 250);
        
        return this;
      }
    };

    xmlhttp.open("GET", "http://ec2-18-220-151-116.us-east-2.compute.amazonaws.com/GameState.xml", true);
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

      if( piece == "" ) {
        piece = " ";
      }
      addPieceHandler(piece);

      if( color == "B" ) {
        addColorHandler("B");
      }
      else if( color == "W") {
        addColorHandler("W");
      }
      else {
        addColorHandler({});
      }
    }

    var turn = xmlDoc.childNodes[2].childNodes[5].attributes[0].nodeValue;
    setTurnHandler(turn);
    return turn;
  }

  const updateAlerts = xml => {
    var doc = xml.response;
    var DOMParser = require('xmldom').DOMParser;
    var xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');

    if( xmlDoc.childNodes[2].childNodes[7].attributes[0].nodeValue == 1 ) {
      if( xmlDoc.childNodes[2].childNodes[7].attributes[1].nodeValue == "W" ) {
        createMessageAlert("Checkmate!", "White team wins!");
      }
      else {
        createMessageAlert("Checkmate!", "Black team wins!");
      }
      return;
    }

    // If the invalidMove flag is set, then create an alert and pass the message
    // to it.
    if( xmlDoc.childNodes[2].childNodes[1].attributes[2].nodeValue == 1 ) {
      if( props.userTeam == xmlDoc.childNodes[2].childNodes[5].attributes[0].nodeValue ) {
        createMessageAlert("Invalid Move", xmlDoc.childNodes[2].childNodes[9].attributes[0].nodeValue);
      }
    }
    
    // If the checkStatus flag is set, then create an alert and pass the message
    // to it.
    if( xmlDoc.childNodes[2].childNodes[5].attributes[1].nodeValue > 0 ) {
      if( props.userTeam == xmlDoc.childNodes[2].childNodes[5].attributes[0].nodeValue ) {
        createMessageAlert("In check!", "You are currently in check!");
      }
    }
  }

  const createMessageAlert = (subject, message) => {
    Alert.alert(
      subject,
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

  var [loaderVisibility, setLoaderVisibility] = useState(false);
  var [loaderVisibilityMessage, setLoaderVisibilityMessage] = useState("");
  const loaderVisibilityHandler = (state, message) => {
    setLoaderVisibility(state);
    if( state == true )
      setLoaderVisibilityMessage(message);
    else
      setLoaderVisibilityMessage("");
  }

  if( init == false ) {
    loadXMLWrapper();
    init = true;
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={{height: '100%', width: '100%', flexDirection: 'column', backgroundColor: 'slategray'}}>
        <View style={{...styles.header, height: '15%'}}>
          <Text style={{padding: 10, color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>The Ol' War Game</Text>
          <Text style={{padding: 0, color: 'white', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>Courtesy of Booty and Sons</Text>
        </View>
        <View style={{...styles.header, height: '5%', borderColor: 'white', borderWidth: 1}}>
          <TextInput
            style={{height: '100%', width: '100%'}}
            onChangeText={urlHandler}
            value={enteredURL}
            placeholder={'paste server url here'}
          />
        </View>
        <View style={{...styles.header, height: '5%', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AnimatedLoader visible={loaderVisibility} animationStyle={styles.lottie}/>
          <Text style={{color: 'orange', fontSize: 20}}>
            {loaderVisibilityMessage}
          </Text>
        </View>
        <View style={{...styles.header, flexDirection: 'row', height: '7.5%'}}>
          <View style={{height: '100%', backgroundColor: 'magenta', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={loadXMLWrapper}
              color='white'
              title='Check for Updates'
              style={{alignItems: 'center', justifyContent: 'center'}}
            />
          </View>
          <View style={{height: '100%', width: '25%', backgroundColor: 'slategray', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 18}}>
              Turn: {turn}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: '7.5%', backgroundColor: 'slategray', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{height: '100%', width: '25%', justifyContent: 'center', alignItems: 'center', borderColor: 'white', borderWidth: 1}}>
            <Text style={{fontSize: 18, color: 'white'}}>
              {touchInput}
            </Text>
          </View>
          <View style={{height: '100%', backgroundColor: 'limegreen', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={sendInput}
              color='white'
              title='Confirm Move'
            />
          </View>
          <View style={{height: '100%', backgroundColor: 'orangered', borderColor: 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={clearTouchInput}
              color='white'  
              title='Clear Input'
            />
          </View>
        </View>
        <View style={{width: '100%', height: '59%', backgroundColor: 'saddlebrown'}}>
          <Board pieceList={pieceList} colorList={colorList} touchInputHandler={touchInputHandler}>
          </Board>
        </View>
        <View style={{width: '100%', height: '1%', backgroundColor: 'saddlebrown'}}>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'slategray',
    borderColor: 'black'
  },
  lottie: {
    bottom: '30%',
    width: 100,
    height: 100
  }
});

export default MainScreen;
