import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomScreenView from "../components/CustomScreenView";
import { useState, useEffect } from "react";
import CustomSelect from "../components/CustomSelect";

const IncidentForm = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Formulario de Incidente", // Set the header title here
    });
  }, [navigation]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <CustomScreenView>
      <Text>Select an option</Text>
      <CustomSelect />
    </CustomScreenView>
  );
};

export default IncidentForm;
