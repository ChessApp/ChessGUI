import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

import Square from './components/Square'

export default function App() {
  return (
    <View style={{flexDirection: 'column', flex: 64}}>
      <View style={styles.header}>
        <Text style={{padding: 75, color: 'black', fontSize: 20, alignItems: 'center', justifyContent: 'center'}}>The Ol' War Game</Text>
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
  xmlhttp.send();
}

var sendInput = () => {
  console.log("sendInput");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log("success");
      console.log(xmlhttp);
      return this;
    }
  };
  xmlhttp.open("POST", "http://ec2-3-21-232-145.us-east-2.compute.amazonaws.com/index.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xmlhttp.open("GET", "http://localhost:8080/GameState.xml", true);
  xmlhttp.send("input=A2,A5");
}


var readFresh = (xml) => {
  console.log("readFresh");
  var x, i, xmlDoc, txt;
  xmlDoc = xml.responseXML;
  console.log("readFresh2");
  txt = "";
  txt = xmlDoc.children[0].children[0].attributes[1].nodeValue;
  console.log(txt);
  xmlDoc.children[0].children[0].attributes[1].nodeValue = "0";
  txt = xmlDoc.children[0].children[0].attributes[1].nodeValue;
  console.log(txt);
}

var updateBoard = (xml) => {

  xmlDoc = xml.responseXML;
  
  var i;
  for(i=0; i<64; i++) {
    var piece = "";
    piece = piece.concat(xmlDoc.children[0].children[4].children[i].attributes[3].nodeValue,
                     xmlDoc.children[0].children[4].children[i].attributes[2].nodeValue);
    // document.getElementById(i.toString()).innerHTML = piece;
    console.log(piece);
  }

  // Update whose turn it is
  // document.getElementById("turn").innerHTML = xmlDoc.children[0].children[2].attributes[0].nodeValue
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
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
