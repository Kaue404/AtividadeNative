import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName}placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="Telefone" value={phone} onChangeText={setPhone}placeholderTextColor="#ccc" />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={setCpf} placeholderTextColor="#ccc"/>
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} placeholderTextColor="#ccc"/>
      <TextInput style={styles.input} placeholder="Curso" value={course} onChangeText={setCourse} placeholderTextColor="#ccc"/>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#000' },
  input: { borderWidth: 1, borderColor: '#88e23b', borderRadius: 5, padding: 10, marginVertical: 10, width: '80%' },
  button: { backgroundColor: "#60a85f", borderRadius: 5, padding: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default Register;
