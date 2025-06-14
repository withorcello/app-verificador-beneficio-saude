export const validateEligibility = (formData) => {
  const {
    idade,
    tipoPlano,
    mesesAtivo,
    carenciaConcluida,
    doencasCronicas,
    dependentes,
    consultasLiberadas,
    faturaAtraso,
    estado,
  } = formData;

  const idadeNum = parseInt(idade);
  const mesesAtivoNum = parseInt(mesesAtivo);
  const dependentesNum = parseInt(dependentes);

  // Regra 1: Idade entre 18 e 65 anos
  if (idadeNum < 18 || idadeNum > 65) {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque sua idade não está entre 18 e 65 anos.",
    };
  }

  // Regra 2: Plano Premium OU (plano Essencial E ativo há pelo menos 12 meses)
  if (
    tipoPlano !== "Premium" &&
    !(tipoPlano === "Essencial" && mesesAtivoNum >= 12)
  ) {
    if (tipoPlano === "Básico") {
      return {
        eligible: false,
        message:
          "Desculpe, você não pode receber o benefício porque o Plano Básico não é elegível para este benefício.",
      };
    } else if (tipoPlano === "Essencial" && mesesAtivoNum < 12) {
      return {
        eligible: false,
        message:
          "Desculpe, você não pode receber o benefício porque o Plano Essencial precisa estar ativo há pelo menos 12 meses.",
      };
    }
  }

  // Regra 3: Carência concluída
  if (carenciaConcluida !== "Sim") {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque ainda não concluiu o período de carência.",
    };
  }

  // Regra 4: Não ter doenças crônicas
  if (doencasCronicas !== "Não") {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque possui doenças crônicas cadastradas.",
    };
  }

  // Regra 5: No máximo 3 dependentes
  if (dependentesNum > 3) {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque possui mais de 3 dependentes.",
    };
  }

  // Regra 6: Ter consultas liberadas nos últimos 6 meses
  if (consultasLiberadas !== "Sim") {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque não teve consultas liberadas nos últimos 6 meses.",
    };
  }

  // Regra 7: Não haver faturas em atraso
  if (faturaAtraso !== "Não") {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque existe fatura em atraso.",
    };
  }

  // Regra 8: Estado atendido
  if (!["São Paulo", "Minas Gerais", "Paraná"].includes(estado)) {
    return {
      eligible: false,
      message:
        "Desculpe, você não pode receber o benefício porque seu estado não é atendido por este programa.",
    };
  }

  // Se passou por todas as regras
  return {
    eligible: true,
    message:
      "Parabéns, você está qualificado para o benefício extra do seu Plano de Saúde!",
  };
};
