import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "./../utils/colors";

const MainBtn = ({ onPress, children, style, ...props }) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { backgroundColor: Colors.btnColorPressed },
      ]}
    >
      {({ pressed }) => (
        <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    maxWidthWidth: "100%",
  },
  buttonText: {
    color: Colors.ChileWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainBtn;
