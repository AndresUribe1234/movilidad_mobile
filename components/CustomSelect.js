import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleDropdown}
        style={styles.selectButton}
      >
        <Text>{selectedOption}</Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionItem}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectButton: {
    paddingVertical: 8,
  },
  optionsContainer: {
    maxHeight: 120,
    marginTop: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default CustomSelect;
