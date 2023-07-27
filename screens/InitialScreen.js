import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomScreenView from "../components/CustomScreenView";
import MainBtn from "../components/MainBtn";
import { MaterialIcons } from "@expo/vector-icons";

const InitialScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <CustomScreenView>
      <MainBtn
        onPress={() => {
          navigation.navigate("Form");
        }}
      >
        <View style={styles.btnContainer}>
          <MaterialIcons name="report" size={30} color="white" />
          <Text style={styles.buttonText}>Reportar Incidente</Text>
        </View>
      </MainBtn>
    </CustomScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InitialScreen;
