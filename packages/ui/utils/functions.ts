// Função para mudanda de valor booleano para um botão de esconder/mostrar valor
export const hideContent = (isHiding : boolean) => {
  return !isHiding;
}

// formatação para valores monetários
export const formatCurrency = (amount : number) => {
  return amount.toFixed(2)
}

// adição de sinal com base no tipo de operação bancária
export const getSignal = (operation : "deposit" | "withdrawal") => {
  return operation === "deposit" ? "+" : "-"
}

// adição do zero em números menores que 10
export const checkNumMinorTen = (date: number) => {
  return date < 10 ? `0${date}` : date;
}

// Checagem de data válida (dia e mês)
export const isValidDate = (day: number, dateType: "day" | "month") => {
  if (dateType === "month") {
    return day >= 1 && day <= 12;
  }
  return day >= 1 && day <= 31;
}

// Função que retorna o valor de flex-direction de um elemento com display flex
export const getAlignDirection = (contentDirection : "row" | "column", alignContent: string) => {
  return contentDirection == "row" ? {justifyContent: alignContent} : {alignItems: alignContent}
}

// transforma uma string em maiúscula com base no valor hasToUpperCase
export const checkToUpperCase = (name: string, hasToUpperCase: boolean) => {
  if (hasToUpperCase) {
    return name.toUpperCase()
  } 
  return name
}

//Recebe um nome e retorna abreviação do mesmo
export const getAbbreviationFromWord = (initialName: string) => {
  if (initialName.includes(" ")) { // Verifica se o nome é composto
    const arrName = initialName.split(" ")
    return `${arrName[0][0].toUpperCase()}${arrName[1][0].toUpperCase()}` // Retorna as iniciais de nome e sobrenome
  }

  return `${initialName[0].toUpperCase()}${initialName[1]}` // Retorna a inicial e o caracter seguinte
}