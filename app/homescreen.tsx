import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import client from '~/sanity/sanity';

// Typedefinitie voor Workout-items
type Exercise = {
  _id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageUrl: string;
};

const HomeScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await client.fetch(`*[_type == "exercises"]{
          _id,
          name,
          description,
          sets,
          reps,
          "imageUrl": image.asset->url
        }`);
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileDetails}>
          <TouchableOpacity onPress={() => router.push('/Profile')}>
            <Image
              source={require('../assets/gympic.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Hello Thomas</Text>
            <Text style={styles.location}>Leuven</Text>
          </View>
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
            <View
              style={[
                styles.dateCircle,
                index === 0 ? styles.currentDateCircle : styles.defaultDateCircle,
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  index === 0 ? styles.currentDateTextColor : styles.defaultDateTextColor,
                ]}
              >
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/squat.jpg')}
          style={styles.workoutImage}
        />
        <Text style={styles.overlayText}>Today's workout</Text>
      </View>

      {/* Power Workout Section */}
      <View style={styles.powerWorkoutContainer}>
        <Text style={styles.workoutMainTitle}>Power Workout</Text>
      </View>

      {/* Workout List */}
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.workoutThumbnail} />
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutTitle}>{item.name}</Text>
            </View>
            <View style={styles.workoutMovesContainer}>
              <Text style={styles.workoutMoves}>Sets: {item.sets} | Reps: {item.reps}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
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
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 5,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
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
    marginHorizontal: 5,
  },
  dayText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentDateTextColor: {
    color: '#000',
  },

  defaultDateTextColor: {
    color: '#FF6347',
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
    height: '100%',
    borderRadius: 10,
  },
  workoutMainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  powerWorkoutContainer: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    marginBottom: 10,
    marginTop: 10,
  },
  overlayText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  currentDateCircle: {
    backgroundColor: '#FF6347',
  },
  defaultDateCircle: {
    backgroundColor: '#e0e0e0',
  },
  dateCircle: {
    width: 36,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2
  },
});

export default HomeScreen;
