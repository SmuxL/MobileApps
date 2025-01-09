import { Link, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// Typedefinitie voor Workout-items
type Workout = {
  id: string;
  name: string;
  description: string;
  moves: number;
  image: any; // Image source
};

const HomeScreen = () => {
  // Workout-array met afbeeldingen
  const workouts: Workout[] = [
    { id: '1', name: 'Bench Press', description: 'Day 2, 20 min', moves: 20, image: require('../assets/bench_press.jpg') },
    { id: '2', name: 'Pull Ups', description: 'Day 3, 20 min', moves: 14, image: require('../assets/pull_ups.jpg') },
    { id: '3', name: 'Bicep Curls', description: 'Day 4, 20 min', moves: 14, image: require('../assets/bicep_curls.jpg') },
  ];

  const router = useRouter();

  // Renderfunctie voor workouts
  const renderWorkout = ({ item }: { item: Workout }) => (
    <View style={styles.workoutItem}>
      <Image source={item.image} style={styles.workoutThumbnail} />
      <View style={styles.workoutDetails}>
        <Text style={styles.workoutTitle}>{item.name}</Text>
        <Text style={styles.workoutDescription}>{item.description}</Text>
      </View>
      <View style={styles.workoutMovesContainer}>
        <Text style={styles.workoutMoves}>{item.moves} moves</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/gympic.jpg')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.greeting}>Hello Thomas</Text>
          <Text style={styles.location}>Leuven</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Today's Workout</Text>

      <Image
        source={require('../assets/squat.jpg')}
        style={styles.workoutImage}
      />
      <Text style={styles.workoutMainTitle}>Power Workout</Text>

      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footerMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/Profile')}>
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutMainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666',
  },
  workoutMovesContainer: {
    backgroundColor: '#FF6347',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  workoutMoves: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default HomeScreen;
