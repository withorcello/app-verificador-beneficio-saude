import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResultDisplay = ({ resultado, mostrarResultado }) => {
  if (!mostrarResultado) return null;

  const isSuccess = resultado.includes("Parabéns");

  return (
    <View
      style={[
        styles.resultContainer,
        isSuccess ? styles.successResult : styles.errorResult,
      ]}
    >
      <Text
        style={[
          styles.resultText,
          isSuccess ? styles.successText : styles.errorText,
        ]}
      >
        {resultado}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
  },
  successResult: {
    backgroundColor: "#d4edda",
    borderColor: "#27ae60",
  },
  errorResult: {
    backgroundColor: "#f8d7da",
    borderColor: "#e74c3c",
  },
  resultText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  successText: {
    color: "#155724",
  },
  errorText: {
    color: "#721c24",
  },
});

export default ResultDisplay;
