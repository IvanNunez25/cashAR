import {
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroBox,
  ViroNode,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@viro-community/react-viro";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
      onChangeCurrency()
    }
  }

  ViroARTrackingTargets.createTargets({
    "billeteReco": {
      source: require('./100pe.jpg'),
      orientation: "Up",
      physicalWidth: 0.1, // real world width in meters 
      type: 'Image' 
    },
  });

  function onChangeCurrency () {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.fastforex.io/convert', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target={"imgObjetivo"}>
        <ViroBox position={[0,.25,0]} scale={[.5,.5,.5]}></ViroBox>
        <ViroText text="ESTOY DETECTANDO LA LANA" scale={[.1,.1,.1]}
        style={styles.helloWorldTextStyle}/>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
    numberOfTrackedImages={1}
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR}}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

