import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ImageBackground } from "react-native";
import Colors from "./../utils/colors";

const CustomScreenView = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[Colors.AppBackgroundColorOne, Colors.AppBackgroundColorTwo]}
      style={[styles.container]}
    >
      <ImageBackground
        source={require("./../assets/chile_metro.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
      </ImageBackground>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.3,
  },
});

export default CustomScreenView;
