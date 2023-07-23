import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import CustomScreenView from "../components/CustomScreenView";
import MainBtn from "../components/MainBtn";
import Colors from "./../utils/colors";

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const signUpHandler = () => {
    if (phoneNumber.length != 9) {
      Alert.alert(
        "Por favor, ingresa un número de teléfono válido.", // Alert title
        error.message, // Alert message, in this case the error message
        [{ text: "ENTENDIDO", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }
  };

  return (
    <CustomScreenView>
      <Text style={styles.title}>Tu número</Text>
      <View style={styles.input_container}>
        <Image
          source={require("./../assets/chile_flagg.png")}
          style={styles.flag}
        />
        <Text>+56</Text>
        <TextInput
          style={styles.input}
          placeholder="X XXXX XXXX"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          selectionColor={Colors.ChileRed}
        />
      </View>
      <MainBtn style={styles.button} onPress={signUpHandler}>
        Registrarse
      </MainBtn>
    </CustomScreenView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input_container: {
    width: "80%",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  flag: { width: "20%", height: 40 },
  input: {
    height: 50,
  },
  button: {
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
