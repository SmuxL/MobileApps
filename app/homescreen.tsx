import { useRouter } from 'expo-router';
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

  // Dynamische datums en dagen genereren
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const dates = Array.from({ length: 7 }, (_, index) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + index);
    return {
      day: days[newDate.getDay()],
      date: newDate.getDate(),
    };
  });

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
      {/* Header */}
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

      {/* Calendar Section */}
      <View style={styles.calendarContainer}>
        {dates.map((item, index) => (
          <View key={index} style={styles.calendarDay}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Text
              style={[
                styles.dateText,
                index === 0 ? styles.currentDateText : null, // Highlight current day
              ]}
            >
              {item.date}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Today's Workout</Text>

      {/* Main Workout Image */}
      <Image
        source={require('../assets/squat.jpg')}
        style={styles.workoutImage}
      />
      <Text style={styles.workoutMainTitle}>Power Workout</Text>

      {/* Workout List */}
      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }} // Extra ruimte onderaan voor footer
      />

      {/* Footer Menu */}
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
    backgroundColor: '#f2f2f2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  location: {
    fontSize: 14,
    color: '#fff',
  },
  notificationIcon: {
    fontSize: 24,
    color: '#fff',
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  calendarDay: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginTop: 5,
  },
  currentDateText: {
    color: '#fff',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347',
    textAlign: 'center',
  },
  workoutImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  workoutThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuButton: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6347',
  },
});

export default HomeScreen;
