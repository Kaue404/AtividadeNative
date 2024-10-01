import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cards = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const searchCharacters = async () => {
    if (searchTerm) {
      try {
        const response = await api.get(`/character/?name=${searchTerm}`);
        if (response.data.results) {
          setCharacters(response.data.results);
        } else {
          setCharacters([]);
          alert('Nenhum personagem encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        alert('Erro ao buscar personagens. Tente novamente.');
      }
    }
  };

  const addCard = async (character) => {
    const newCard = {
      id: character.id,
      name: character.name,
      status: character.status,
      image: character.image,
      location: character.location.name,
      episode: character.episode[0],
    };

    const updatedCards = [...savedCards, newCard];
    setSavedCards(updatedCards);
    await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
  };

  const deleteCard = async (id) => {
    const updatedCards = savedCards.filter(card => card.id !== id);
    setSavedCards(updatedCards);
    await AsyncStorage.setItem('savedCards', JSON.stringify(updatedCards));
  };

  useEffect(() => {
    const loadSavedCards = async () => {
      const cards = await AsyncStorage.getItem('savedCards');
      if (cards) {
        setSavedCards(JSON.parse(cards));
      }
    };
    loadSavedCards();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar personagem"
        placeholderTextColor="#fff" 
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchCharacters}
      />
      <TouchableOpacity style={styles.button} onPress={searchCharacters}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>Última localização: {item.location.name}</Text>
            <Text style={styles.text}>Primeiro episódio: {item.episode[0]}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addCard(item)}>
              <Text style={styles.buttonText}>Adicionar Card</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <FlatList
        data={savedCards}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.savedCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CardDetails', { character: item })}>
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => deleteCard(item.id)}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, color: '#fff' }, 
  card: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#88e23b' },
  savedCard: { marginBottom: 15, padding: 10, borderWidth: 1, borderColor: '#88e23b' },
  image: { width: 100, height: 100, borderRadius: 50 },
  text: { color: '#fff' },
  button: { backgroundColor: '#60a85f', borderRadius: 5, padding: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' }, 
});

export default Cards;
