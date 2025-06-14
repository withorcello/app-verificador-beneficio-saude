import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import InputField from "./components/InputField";
import PickerField from "./components/PickerField";
import YesNoButtons from "./components/YesNoButtons";
import ResultDisplay from "./components/ResultDisplay";
import { validateEligibility } from "./utils/eligibilityValidator";

const App = () => {
  const [formData, setFormData] = useState({
    idade: "",
    tipoPlano: "Básico",
    mesesAtivo: "",
    carenciaConcluida: "",
    doencasCronicas: "",
    dependentes: "",
    consultasLiberadas: "",
    faturaAtraso: "",
    estado: "São Paulo",
  });

  const [resultado, setResultado] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Dados para os seletores
  const estados = ["São Paulo", "Minas Gerais", "Paraná", "Outros"];
  const planos = ["Básico", "Essencial", "Premium"];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const verificarElegibilidade = () => {
    const {
      idade,
      mesesAtivo,
      dependentes,
      carenciaConcluida,
      doencasCronicas,
      consultasLiberadas,
      faturaAtraso,
    } = formData;

    if (
      !idade ||
      !mesesAtivo ||
      !dependentes ||
      !carenciaConcluida ||
      !doencasCronicas ||
      !consultasLiberadas ||
      !faturaAtraso
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const result = validateEligibility(formData);
    setResultado(result.message);
    setMostrarResultado(true);
  };

  const resetForm = () => {
    setFormData({
      idade: "",
      tipoPlano: "Básico",
      mesesAtivo: "",
      carenciaConcluida: "",
      doencasCronicas: "",
      dependentes: "",
      consultasLiberadas: "",
      faturaAtraso: "",
      estado: "São Paulo",
    });
    setMostrarResultado(false);
    setResultado("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Verificador de Benefício Extra</Text>
        <Text style={styles.subtitle}>Plano de Saúde</Text>

        <View style={styles.form}>
          <InputField
            label="Idade *"
            value={formData.idade}
            onChangeText={(value) =>
              updateFormData("idade", value.replace(/[^0-9]/g, "").slice(0, 3))
            }
            placeholder="Digite sua idade"
            keyboardType="numeric"
          />

          <PickerField
            label="Tipo de Plano *"
            selectedValue={formData.tipoPlano}
            onValueChange={(value) => updateFormData("tipoPlano", value)}
            items={planos}
          />

          <InputField
            label="Há quantos meses o plano está ativo? *"
            value={formData.mesesAtivo}
            onChangeText={(value) =>
              updateFormData(
                "mesesAtivo",
                value.replace(/[^0-9]/g, "").slice(0, 3),
              )
            }
            placeholder="Número de meses"
            keyboardType="numeric"
          />

          <YesNoButtons
            label="Já passou pelo período de carência? *"
            selectedValue={formData.carenciaConcluida}
            onValueChange={(value) =>
              updateFormData("carenciaConcluida", value)
            }
          />

          <YesNoButtons
            label="Possui doenças crônicas cadastradas? *"
            selectedValue={formData.doencasCronicas}
            onValueChange={(value) => updateFormData("doencasCronicas", value)}
          />

          <InputField
            label="Quantos dependentes estão incluídos? *"
            value={formData.dependentes}
            onChangeText={(value) =>
              updateFormData(
                "dependentes",
                value.replace(/[^0-9]/g, "").slice(0, 2),
              )
            }
            placeholder="Número de dependentes"
            keyboardType="numeric"
          />

          <YesNoButtons
            label="Teve consultas liberadas nos últimos 6 meses? *"
            selectedValue={formData.consultasLiberadas}
            onValueChange={(value) =>
              updateFormData("consultasLiberadas", value)
            }
          />

          <YesNoButtons
            label="Existe alguma fatura em atraso? *"
            selectedValue={formData.faturaAtraso}
            onValueChange={(value) => updateFormData("faturaAtraso", value)}
          />

          <PickerField
            label="Estado onde mora *"
            selectedValue={formData.estado}
            onValueChange={(value) => updateFormData("estado", value)}
            items={estados}
          />

          {/* Botões */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={verificarElegibilidade}
            >
              <Text style={styles.submitButtonText}>
                Verificar Elegibilidade
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
              <Text style={styles.resetButtonText}>Limpar Formulário</Text>
            </TouchableOpacity>
          </View>

          <ResultDisplay
            resultado={resultado}
            mostrarResultado={mostrarResultado}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f8c8d",
    marginBottom: 30,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#27ae60",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#95a5a6",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default App;
