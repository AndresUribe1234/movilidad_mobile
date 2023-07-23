import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import CustomScreenView from "../components/CustomScreenView";
import MainBtn from "../components/MainBtn";
import Colors from "./../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/supabase";

const SignUpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const signUpHandler = async () => {
    if (phoneNumber.length != 9) {
      alertModal("Por favor, ingresa un número de teléfono válido.");
      return;
    }

    await storePhoneNumber(phoneNumber);

    console.log(phoneNumber);

    const response = await supabase
      .from("ejemplo_tabla")
      .insert({ id: 4, name: "Pax" });

    if (response.status === 409) {
      alertModal("El número de teléfono ya está en uso por otro usuario.");
      return;
    }

    if (response.status === 201) {
      console.log("coronaste el registro fue exitoso");
      console.log(response);
    }
  };

  function alertModal(message) {
    Alert.alert(
      "Error", // Alert title
      message, // Alert message
      [{ text: "ENTENDIDO", onPress: () => console.log("OK Pressed") }]
    );
  }

  async function storePhoneNumber(number) {
    try {
      await AsyncStorage.setItem("phoneNumber", number);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <CustomScreenView>
      <Text style={styles.title}>Tu número</Text>
      <View style={styles.input_container}>
        <Image
          source={require("./../assets/chile_flag.png")}
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
