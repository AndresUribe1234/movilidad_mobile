import { StyleSheet, Text, View } from "react-native";

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <Text>App para el transporte publico de chile!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "salmon",
  },
});

export default InitialScreen;
