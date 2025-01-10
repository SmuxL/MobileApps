import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import client from '~/sanity/sanity';
import users from '~/sanity/schemaTypes/users';

const SignUpScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const existingUserQuery = `*[_type == "user" && email == $email][0]`;
      const existingUser = await client.fetch(existingUserQuery, { email });

      if (existingUser) {
        Alert.alert('Error', 'Email is already in use.');
        return;
      }

      const Users = {
        _type: 'user',
        name,
        email,
        password,
      };

      await client.create(Users);
      Alert.alert('Success', 'Account created successfully! You can now log in.');
      router.push('/'); 
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', 'Failed to create an account. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background_signup.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#fff"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
  },
  button: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#FFD700',
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
