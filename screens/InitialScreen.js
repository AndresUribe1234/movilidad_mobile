import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "./../utils/colors";
import CustomScreenView from "../components/CustomScreenView";

const InitialScreen = () => {
  return (
    <CustomScreenView>
      <Text>App para el transporte publico de chile!</Text>
      <Text>HELLO</Text>
    </CustomScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InitialScreen;
