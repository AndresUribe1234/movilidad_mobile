import { Text, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomScreenView from "../components/CustomScreenView";
import { useState, useEffect, useContext } from "react";
import CustomSelect from "./../components/CustomSelect";
import { View } from "react-native";
import MainBtn from "../components/MainBtn";
import AuthContext from "../store/auth-context";
import { supabase } from "../utils/supabase";
import Colors from "./../utils/colors";
import * as Location from "expo-location";

const IncidentForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");
  const navigation = useNavigation();
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  const authctx = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
      title: "Formulario de Incidente", // Set the header title here
    });
  }, [navigation]);

  const optionHandler = (option) => {
    setSelectedOption(option);
  };

  const submitHandler = async () => {
    try {
      if (selectedOption === "") {
        Alert.alert(
          "Error", // Alert title
          "Debe seleccionar un incidente válido!", // Alert message
          [{ text: "ENTENDIDO", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }

      let locationApp;

      if (locationPermissionInformation.status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        locationApp = location;
      }

      const textSubmit = textInput.trim();

      const response = await supabase.from("incidentes").insert({
        idUsuario: Number(authctx.credentials.phoneNumber),
        longitude: locationApp?.coords?.longitude,
        latitude: locationApp?.coords?.latitude,
        incidente: selectedOption,
        comentarios: textInput !== "" ? textSubmit : null,
      });

      if (response.status === 201 || response.status === 200) {
        navigation.navigate("Home");
        return;
      }

      if (response.status !== 201) {
        Alert.alert(
          "Error", // Alert title
          `Hubo un error enviando el formulario intentelo de nuevo! ${JSON.stringify(
            response.error
          )}`, // Alert message
          [{ text: "ENTENDIDO", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomScreenView>
      <View style={styles.container}>
        <Text style={styles.title}>Incidente</Text>
        <CustomSelect onSelect={optionHandler} />
        <Text style={styles.title}>Comentarios</Text>
        <TextInput
          multiline={true} // enables multiline input
          numberOfLines={4} // sets the number of visible lines
          placeholder="Describe que fue lo que paso..." // placeholder text
          style={styles.textContainer}
          onChangeText={(text) => setTextInput(text)}
          selectionColor={Colors.btnColor}
        />
        <MainBtn onPress={submitHandler}>Reportar</MainBtn>
      </View>
    </CustomScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 15,
  },
  textContainer: {
    backgroundColor: "white",
    width: "80%",
    height: "25%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    color: Colors.textColor,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
});

export default IncidentForm;
