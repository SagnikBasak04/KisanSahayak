import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useEnrollmentContext } from "../context/EnrollmentContext";
import { useElevatedUserContext } from "../context/ElevatedUserContext";
import useCreateMetadata from "../hooks/useCreateMetadata";

const Contribute = () => {
  const { enrolledUser } = useEnrollmentContext();
  const { elevatedUser } = useElevatedUserContext();
  const { loading, createMetadata } = useCreateMetadata();

  const accuracyCalc = () => {
    if (enrolledUser?.correct === 0 && enrolledUser?.incorrect === 0) return "0.0";
    const accuracy =
      (enrolledUser?.correct / (enrolledUser?.correct + enrolledUser?.incorrect)) * 100.0;
    return accuracy.toFixed(1);
  };

  console.log(enrolledUser);
  
  const handleEnrolment = async () => {
    await createMetadata();
  }; 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Contribute to your and our Cause!</Text>

      {enrolledUser ? (
        <>
          <View style={styles.statsContainer}>
            <View style={[styles.statBox, { backgroundColor: "#A7F3D0" }]}>
              <Icon name="check" style={[styles.icon, { color: "#065F46" }]} />
              <Text style={[styles.statText, { color: "#065F46" }]}>
                {enrolledUser?.correct}
              </Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: "#FECACA" }]}>
              <Ionicon name="close-circle" style={[styles.icon, { color: "#991B1B" }]} />
              <Text style={[styles.statText, { color: "#991B1B" }]}>
                {enrolledUser?.incorrect}
              </Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: "#D1D5DB" }]}>
              <Ionicon name="stats-chart" style={[styles.icon, { color: "#374151" }]} />
              <Text style={[styles.statText, { color: "#374151" }]}>
                {accuracyCalc()}%
              </Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: "#FDE68A" }]}>
              <MaterialIcon
                name="eco"
                style={[styles.icon, { color: "#065F46" }]}
              />
              <Text style={[styles.statText, { color: "#065F46" }]}>
                {enrolledUser?.greenPoints.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => console.log("Navigate to /elevated-user/play")}
            >
              <Image source={require("../../assets/game.png")} style={styles.optionImage} />
              <Text style={styles.optionText}>
                Play an interactive game{"\n"}Earn Green Points!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBox}
              onPress={() => console.log("Navigate to /elevated-user/images")}
            >
              <Image source={require("../../assets/images.png")} style={styles.optionImage} />
              <Text style={styles.optionText}>
                Contribute with images of your own{"\n"}Earn Green Points!
              </Text>
            </TouchableOpacity>

            {elevatedUser && (
              <TouchableOpacity
                style={styles.optionBox}
                onPress={() => console.log("Navigate to /elevated-user/records")}
              >
                <Image source={require("../../assets/images.png")} style={styles.optionImage} />
                <Text style={styles.optionText}>
                  Help us Improve with your valuable contribution!
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View style={styles.enrollmentContainer}>
          <Image source={require("../../assets/GreenGuardians.png")} style={styles.logo} />
          <Image source={require("../../assets/images.png")} style={styles.journeyImage} />
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={handleEnrolment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.enrollButtonText}>Embark on the amazing Journey</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#374151",
  },
  statsContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  statBox: {
    width: "40%",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
    marginBottom: 5,
  },
  statText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  optionBox: {
    width: "90%",
    backgroundColor: "#D1FAE5",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  optionImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  enrollmentContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  journeyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  enrollButton: {
    backgroundColor: "#059669",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Contribute;