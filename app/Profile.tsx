import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import client from '../sanity/sanity';
import { useRouter } from 'expo-router';

type User = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  weight: number;
  profileImageUrl: string;
};

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data: User = await client.fetch(
          `*[_type == "users" && name == "Thomas Van Beneden"][0]{
        name,
        email,
        password,
        phoneNumber,
        weight,
        "profileImageUrl": profileImage.asset->url
      }`
        );
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: user?.profileImageUrl }}
            style={styles.profileImage}
          />
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={user.name}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={user.email}
            editable={false}
          />
          <View style={[styles.input, styles.passwordContainer]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!isPasswordVisible}
              value={user?.password || ''}
              editable={false}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIconContainer}
            >
              <Text style={styles.eyeIcon}>
                {isPasswordVisible ? '👁️' : '🙈'}
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#999"
            value={user.phoneNumber}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            placeholderTextColor="#999"
            value={user.weight?.toString() || ''}
            editable={false}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Menu */}
      <View style={styles.footerMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push('/homescreen')}
        >
          <Text style={styles.menuIcon}>🏠</Text>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.activeButton]}
          onPress={() => router.push('/Profile')}
        >
          <View style={styles.activeIndicator}>
            <Text style={[styles.menuIcon, { color: '#fff' }]}>👤</Text>
            <Text style={[styles.menuText, { color: '#fff' }]}>Profile</Text>
          </View>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  editIcon: {
    fontSize: 18,
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#FF6347',
    backgroundColor: '#fff',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#FF6347',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
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
    flex: 1,
    paddingVertical: 5,
  },
  menuIcon: {
    fontSize: 20,
    marginBottom: 2,
    color: '#FF6347',
  },
  menuText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  activeButton: {
    backgroundColor: 'transparent',
  },
  activeIndicator: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6347',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  eyeIconContainer: {
    marginLeft: 'auto',
  },
  eyeIcon: {
    fontSize: 18,
    color: '#999',
  },
});

export default ProfileScreen;
