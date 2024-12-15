import React, { useRef, useState } from "react";
import { Button, Text } from "@react-navigation/elements";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons"; // For eye icons

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "loginPage"
>;

export function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev);
  };

  const validateInputs = () => {
    const newErrors = {
      name: name.trim() === "",
      surname: surname.trim() === "",
      password: password.trim() === "",
      lengthCheck: password.length >= 8,
      upperCaseCheck: /[A-Z]/.test(password),
      lowerCaseCheck: /[a-z]/.test(password),
      numberCheck: /\d/.test(password),
      specialCharCheck: /[@!#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]+/.test(
        password
      ),
    };

    const errorMessages = [];
    if (newErrors.name) errorMessages.push("• Name can not be empty.");
    if (newErrors.surname) errorMessages.push("• Surname can not be empty.");
    if (newErrors.password) errorMessages.push("• Password can not be empty.");
    if (!newErrors.lengthCheck)
      errorMessages.push("• Password must be at least 8 characters long.");
    if (!newErrors.upperCaseCheck)
      errorMessages.push(
        "• Password must include at least one uppercase letter."
      );
    if (!newErrors.lowerCaseCheck)
      errorMessages.push(
        "• Password must include at least one lowercase letter."
      );
    if (!newErrors.numberCheck)
      errorMessages.push("• Password must include at least one number.");
    if (!newErrors.specialCharCheck)
      errorMessages.push(
        "• Password must include at least one special character."
      );

    if (errorMessages.length > 0) {
      alert(`Input Errors:\n${errorMessages.join("\n")}`);
    } else {
      navigation.navigate("Welcome", { name, surname });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/register-image.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Register</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              returnKeyType="next"
              secureTextEntry={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Surname"
              value={surname}
              returnKeyType="next"
              secureTextEntry={false}
              onChangeText={(text) => {
                setSurname(text);
              }}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                returnKeyType="done"
                secureTextEntry={!visible}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={visible ? "eye" : "eye-off"}
                  size={20}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={validateInputs}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
  },
  imageContainer: {
    backgroundColor: "#f7f7ff",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  form: {
    flex: 2,
    padding: 10,
    gap: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "80%",
    marginTop: 0,
    marginBottom: 20,
  },
  header: {
    color: "#4f2aeb",
    fontSize: 40,
    fontWeight: "900",
  },
  input: {
    width: "80%",
    height: 45,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    height: 45,
    borderRadius: 5,
    backgroundColor: "#4f2aeb",
    alignItems: "center", // Center text
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -2,
  },
  errorContainer: {
    alignItems: "flex-start",
  },
  eyeIcon: {
    marginRight: 10,
  },
  passwordContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});
