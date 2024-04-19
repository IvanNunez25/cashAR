import React from "react";
import { View, Text } from 'react-native';
import Tts from 'react-native-tts';

function TTS () {

  const handleVoice = (ttsText: string) => {
    Tts.setDefaultLanguage('es-ES');
    Tts.speak(ttsText);
  }

  return (
    <View>
      <Text onPress={ () => handleVoice("Hola mundo") }>Hola mundo</Text>
    </View>
  )
}

export default TTS;