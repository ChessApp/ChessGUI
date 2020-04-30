import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Square from './components/Square'

export default function App() {
  const [enteredInput, setEnteredInput] = useState('');
  const inputHandler = inputText => {
    setEnteredInput(inputText);
  }

  const [enteredURL, setEnteredURL] = useState('');
  const urlHandler = inputURL => {
    setEnteredURL(inputURL);
  }

  const sendInput = () => {
    console.log("sendInput");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        console.log("success");
        console.log(xmlhttp);
        return this;
      }
    };
    console.log(enteredURL.concat("/index.php"));
    xmlhttp.open("POST", enteredURL.concat("/index.php"), true);
    // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xmlhttp.open("GET", "http://localhost:8080/GameState.xml", true);
    var inputBase = "input=";
    xmlhttp.send(inputBase.concat(enteredInput));
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={{flexDirection: 'column', flex: 64}}>
        <View style={styles.header}>
          <Text style={{padding: 75, color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>The Ol' War Game</Text>
        </View>
        <View style={styles.header}>
          <TextInput
            style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 1}}
            onChangeText={urlHandler}
            value={enteredURL}
            placeholder={'can copy-paste'}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={loadXML}
            title='GET'
          />
          <Button
            onPress={sendInput}
            title='POST'
          />
          <TextInput
            style={{height: 40, width: 60, borderColor: 'gray', borderWidth: 1}}
            onChangeText={inputHandler}
            value={enteredInput}
          />
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
    </TouchableWithoutFeedback>
  );
}

var loadXML = () => {
  console.log("loadXML");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log("success");
      console.log(xmlhttp);
      readFresh(this);
      updateBoard(this);
      return this;
    }
  };
  xmlhttp.open("GET", "http://ec2-3-21-232-145.us-east-2.compute.amazonaws.com/GameState.xml", true);
  // xmlhttp.open("GET", "http://localhost:8080/GameState.xml", true);
  xmlhttp.overrideMimeType('application/xml');
  xmlhttp.send();
}

var readFresh = (xml) => {
  console.log("readFresh");
  var x, i, xmlDoc, doc, txt;
  doc = xml.response;
  var DOMParser = require('xmldom').DOMParser;
  xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');
  console.dir(xmlDoc);
  // parseString(doc, function(err,result) {
  //   console.dir(result);
  // });
  console.log("readFresh2");
  txt = "";
  txt = xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue;
  console.log(txt);
  xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue = "0";
  txt = xmlDoc.childNodes[2].childNodes[1].attributes[1].nodeValue;
  console.log(txt);
}

var updateBoard = (xml) => {
  var doc = xml.response;
  var DOMParser = require('xmldom').DOMParser;
  var xmlDoc = new DOMParser().parseFromString(doc, 'text/xml');

  var i;
  for(i=0; i<64; i++) {
    var piece = "";
    piece = piece.concat(xmlDoc.childNodes[2].childNodes[9].childNodes[i*2 + 1].attributes[3].nodeValue,
                     xmlDoc.childNodes[2].childNodes[9].childNodes[i*2 + 1].attributes[2].nodeValue);
    // document.getElementById(i.toString()).innerHTML = piece;
    console.log(piece);
  }

  // Update whose turn it is
  // document.getElementById("turn").innerHTML = xmlDoc.children[0].children[2].attributes[0].nodeValue
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
