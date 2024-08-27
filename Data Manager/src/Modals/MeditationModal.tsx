import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native"; // Importing the upload method

// Assuming you have a Colors constant defined somewhere
const Colors = {
  Primary: "#1c1c1c",
  Secondary: "#FFFFFF",
  Blue: "#1E90FF",
  CardBackground: "#2b2b2b",
  CardBorder: "#383838",
  TextPrimary: "#E5E5E5",
  TextSecondary: "#A5A5A5",
};

const SocialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    bio: "Photography enthusiast | Travel lover",
    posts: 42,
    followers: 1520,
    following: 350,
    profileImage: "https://via.placeholder.com/150",
  });

  // Create and configure your Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dwe2jadmh", // Replace with your Cloudinary cloud name
    },
    url: {
      secure: true, // Ensure the URL is secure (https)
    },
  });

  const handleEditProfile = () => {
    setEditProfileModalVisible(false);
    // Here you would typically update the backend with the new user data
  };

  // Function to handle file upload to Cloudinary using Cloudinary's native upload method
  const handleFileUpload = async (fileUri) => {
    console.log(fileUri);
    try {
      const response = await upload(cld, {
        file: fileUri,
        options: {
          upload_preset: "ml_default", // Use your Cloudinary upload preset
        },
        callback: (error, result) => {
          if (error) {
            console.error("Upload error:", error);
          } else {
            console.log("Upload result:", result);
          }
        },
      });

      console.log("Cloudinary Response:", response);
      return response.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error("File upload error:", error);
      return null;
    }
  };

  // Function to handle selecting a new profile picture
  const handleChangeProfilePicture = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Picker Result:", pickerResult);

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const selectedImage = pickerResult.assets[0].uri;
      const url = await handleFileUpload(selectedImage);
      console.log("Uploaded Image URL:", url);
      if (url) {
        setUserData({ ...userData, profileImage: url }); // Use the uploaded image URL
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerUsername}>{userData.username}</Text>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color={Colors.Secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
            <AdvancedImage
              cldImg={cld.image(userData.profileImage)}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.followers}</Text>
              <Text style={styles.statLabel}>Gym Points</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text
            style={styles.fullName}
          >{`${userData.firstName} ${userData.lastName}`}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </View>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => setEditProfileModalVisible(true)}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.postGridHeader}>
          <TouchableOpacity style={styles.gridToggle}></TouchableOpacity>
        </View>

        <FlatList
          data={Array(9)
            .fill()
            .map((_, index) => ({
              id: index.toString(),
              image: "https://via.placeholder.com/150",
            }))}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.post}
              onPress={() => console.log(`Navigate to post ${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.postImage} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color={Colors.Secondary} />
      </TouchableOpacity>

      {/* New Post Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={Colors.Secondary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Post</Text>
            <TouchableOpacity>
              <Text style={styles.modalShareText}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.uploadArea}>
            <Ionicons name="camera" size={48} color={Colors.TextSecondary} />
            <Text style={styles.uploadText}>Tap to add photo</Text>
          </View>
        </View>
      </Modal>

      {/* Profile Picture Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.profileModalOverlay}
          activeOpacity={1}
          onPress={() => setProfileModalVisible(false)}
        >
          <AdvancedImage
            cldImg={cld.image(userData.profileImage)}
            style={styles.largeProfileImage}
          />
        </TouchableOpacity>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileModalVisible}
        onRequestClose={() => setEditProfileModalVisible(false)}
      >
        <View style={styles.editProfileModalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditProfileModalVisible(false)}>
              <Ionicons name="close" size={24} color={Colors.Secondary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleEditProfile}>
              <Ionicons name="checkmark" size={24} color={Colors.Blue} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.editProfileForm}>
            <TouchableOpacity
              style={styles.changeProfilePicture}
              onPress={handleChangeProfilePicture}
            >
              <AdvancedImage
                cldImg={cld.image(userData.profileImage)}
                style={styles.editProfileImage}
              />
              <Text style={styles.changeProfilePictureText}>
                Change Profile Picture
              </Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.input}
                value={userData.username}
                onChangeText={(text) =>
                  setUserData({ ...userData, username: text })
                }
                placeholderTextColor={Colors.TextSecondary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                value={userData.firstName}
                onChangeText={(text) =>
                  setUserData({ ...userData, firstName: text })
                }
                placeholderTextColor={Colors.TextSecondary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={userData.lastName}
                onChangeText={(text) =>
                  setUserData({ ...userData, lastName: text })
                }
                placeholderTextColor={Colors.TextSecondary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={userData.bio}
                onChangeText={(text) => setUserData({ ...userData, bio: text })}
                multiline
                placeholderTextColor={Colors.TextSecondary}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.CardBorder,
  },
  headerUsername: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TextPrimary,
  },
  profileSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileStats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TextPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.TextSecondary,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.TextPrimary,
  },
  bio: {
    fontSize: 14,
    color: Colors.TextSecondary,
    marginTop: 5,
  },
  editProfileButton: {
    marginHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.CardBorder,
    alignItems: "center",
    backgroundColor: Colors.CardBackground,
  },
  editProfileText: {
    color: Colors.TextPrimary,
    fontWeight: "bold",
  },
  postGridHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: Colors.CardBorder,
    marginTop: 15,
  },
  gridToggle: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  post: {
    width: "33.33%",
    aspectRatio: 1,
    padding: 1,
  },
  postImage: {
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: Colors.Blue,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.CardBorder,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TextPrimary,
  },
  modalShareText: {
    color: Colors.Blue,
    fontWeight: "bold",
  },
  uploadArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    color: Colors.TextSecondary,
    marginTop: 10,
  },
  profileModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  largeProfileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  editProfileModalContent: {
    flex: 1,
    backgroundColor: Colors.Primary,
  },
  editProfileForm: {
    padding: 20,
  },
  changeProfilePicture: {
    alignItems: "center",
    marginBottom: 20,
  },
  editProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeProfilePictureText: {
    color: Colors.Blue,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: Colors.TextSecondary,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.CardBorder,
    color: Colors.TextPrimary,
    fontSize: 16,
    paddingVertical: 5,
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default SocialScreen;
