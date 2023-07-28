import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "./../utils/colors";

const options = [
  "Robo en el bus",
  "Robo en el paradero",
  "Deterioro del paradero",
  "Micro no se detuvo",
  "Experimentado acoso sexual",
  "Observado acoso sexual",
  "Experimentado abuso sexual",
  "Observado abuso sexual",
  "Micro no paso en el horario correspondiente",
  "Conductor maneja con exceso de velocidad",
  "Falta iluminación en el paradero",
  "Pantalla del paradero no funciona",
  "Otro",
];

const CustomSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Seleccione un incidente"
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onSelect(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleDropdown}
        style={styles.selectButton}
      >
        <Text style={styles.textOption}>{selectedOption}</Text>
        {!isOpen ? (
          <AntDesign name="down" size={24} color="grey" />
        ) : (
          <AntDesign name="up" size={24} color="grey" />
        )}
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionItem}
            >
              <Text style={styles.textOption}>{option}</Text>
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
    width: "80%",
  },
  textOption: { color: Colors.textColor },
  selectButton: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionsContainer: {
    maxHeight: 120,
    marginTop: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
});

export default CustomSelect;
