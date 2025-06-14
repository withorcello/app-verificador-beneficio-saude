import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const YesNoButtons = ({ label, selectedValue, onValueChange }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedValue === "Sim" && styles.selectedButton,
          ]}
          onPress={() => onValueChange("Sim")}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === "Sim" && styles.selectedText,
            ]}
          >
            Sim
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedValue === "Não" && styles.selectedButton,
          ]}
          onPress={() => onValueChange("Não")}
        >
          <Text
            style={[
              styles.optionText,
              selectedValue === "Não" && styles.selectedText,
            ]}
          >
            Não
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  optionText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  selectedText: {
    color: "white",
    fontWeight: "600",
  },
});

export default YesNoButtons;
