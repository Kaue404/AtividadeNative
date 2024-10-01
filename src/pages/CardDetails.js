import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CardDetails = ({ route, navigation }) => {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.text}>Nome: {character.name}</Text>
      <Text style={styles.text}>Status: {character.status}</Text>
      <Text style={styles.text}>Última localização: {character.location.name}</Text>
      <Text style={styles.text}>Primeiro episódio: {character.episode[0]}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  image: { width: 200, height: 200 },
  text: { color: '#fff', fontSize: 18, marginVertical: 5 },
  button: { backgroundColor: '#60a85f', borderRadius: 5, padding: 10, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CardDetails;
