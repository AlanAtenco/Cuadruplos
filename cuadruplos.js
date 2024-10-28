const generateCuadruplos = () => {
    const input = document.getElementById("operation").value;
    let cuadruplos = [];
  
    // Validación de restricciones
    const tokens = input.match(/(\d+|\+|\-|\*|\/|\(|\))/g);
    const numbers = tokens.filter(token => !isNaN(token));
    const operators = tokens.filter(token => ['+', '-', '*', '/'].includes(token));
    const parentheses = tokens.filter(token => ['(', ')'].includes(token));
  
    if (numbers.length > 5) {
      document.getElementById("result").textContent = "No se pueden ingresar más de 5 números.";
      return;
    }
    if (operators.length > 4) {
      document.getElementById("result").textContent = "No se pueden ingresar más de 4 operadores.";
      return;
    }
    if (parentheses.length > 0) {
      document.getElementById("result").textContent = "Operación no valida .";
      return;
    }
  
    // Verificar si es una operación válida
    try {
      const result = eval(input); // Evalúa la operación básica
      document.getElementById("result").textContent = `Resultado: ${result}`;
    } catch (e) {
      document.getElementById("result").textContent = "Operación no válida.";
      return;
    }
  
    // Operadores y precedencias
    const operatorsPrecedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  
    // Función para procesar operadores
    const processOperator = (op, a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      let result;
  
      switch (op) {
        case '+':
          result = numA + numB;
          break;
        case '-':
          result = numA - numB;
          break;
        case '*':
          result = numA * numB;
          break;
        case '/':
          result = numA / numB;
          break;
      }
  
      cuadruplos.push({ op, arg1: a, arg2: b, result });
      return result; // Devuelve el resultado en lugar de una variable temporal
    };
  
    // Algoritmo de Shunting Yard para convertir la expresión a notación postfija
    let outputQueue = [];
    let operatorStack = [];
  
    tokens.forEach(token => {
      if (!isNaN(token)) {
        outputQueue.push(token);
      } else if (operatorsPrecedence[token]) {
        while (
          operatorStack.length &&
          operatorsPrecedence[operatorStack[operatorStack.length - 1]] >= operatorsPrecedence[token]
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });
  
    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }
  
    // Procesar la expresión en notación postfija para generar los cuádruplos
    let stack = [];
    outputQueue.forEach(token => {
      if (!isNaN(token)) {
        stack.push(token);
      } else if (operatorsPrecedence[token]) {
        const b = stack.pop();
        const a = stack.pop();
        const result = processOperator(token, a, b);
        stack.push(result);
      }
    });
  
    // Mostrar cuádruplos generados
    const cuadruplosDiv = document.getElementById("cuadruplos");
    cuadruplosDiv.innerHTML = `<h2>Cuádruplos</h2>`;
    cuadruplos.forEach((quad, index) => {
      cuadruplosDiv.innerHTML += `<p>${index + 1}: (${quad.op}, ${quad.arg1}, ${quad.arg2}, ${quad.result})</p>`;
    });
  };
  