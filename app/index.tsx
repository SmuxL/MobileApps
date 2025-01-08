import { Stack, Link } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';


export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View>
        <Text>Hello world</Text>
      </View>
    </>
  );
}
