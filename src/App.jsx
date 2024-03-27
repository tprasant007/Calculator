import { useState, useEffect } from "react";

function App() {
  const [numA, setNumA] = useState("");
  const [numB, setNumB] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("0");

  // This is to render the expression
  useEffect(() => {
    setExpression(`${numA} ${operator} ${numB}`);
  }, [numA, numB, operator]);

  // For arithmetic operator buttons

  const handleOperator = (symbols) => {
    if (!numA) {
      return;
    } else if (numB[0] === "-") {
      setNumB("");
      setOperator(symbols);
    } else if (numB) {
      handleEquals();
      setOperator(symbols);
    } else {
      setOperator(symbols);
    }
  };

  // This handle subtraction operator as well as makes numbers negative.
  function handleMinus() {
    if (!numA) {
      setNumA("-");
    } else if (numB) {
      handleEquals();
      setOperator("-");
    } else if (numA && !operator) {
      setOperator("-");
    } else if (numA && operator) {
      setNumB("-");
    }
  }

  // This handles % button.
  function handlePercentage() {
    if(numA && !operator) {
      setNumA(prev => {
        let number = parseFloat(prev) / 100
        return number.toString()
      })
    }
  }

  // This handles decimal value.
  function handleDecimal() {
    if (!operator) {
      setNumA((prev) => {
        if (prev.length === 0) {
          return "0.";
        } else if (!prev.includes(".")) {
          return prev + ".";
        }
        return prev;
      });
    } else {
      setNumB((prev) => {
        if (prev.length === 0) {
          return "0.";
        } else if (!prev.includes(".")) {
          return prev + ".";
        }
        return prev;
      });
    }
  }

  // This is to handle zero and to make sure non decimal number doesn't start with 0.
  function handleZero() {
    if (!operator) {
      setNumA((prev) => {
        if (prev.length !== 0) {
          return prev + "0";
        }
        return "";
      });
    } else {
      setNumB((prev) => {
        if (parseFloat(prev) !== 0) {
          return prev + "0";
        }
        return "0";
      });
    }
  }

  // For "=" button
  function handleEquals() {
    if (numB === "0" && operator === "/") {
      setNumA("0");
      setResult("Infinity");
    } else {
      let total = 0;
      switch (operator) {
        case "+":
          total = parseFloat(numA) + parseFloat(numB);
          break;
        case "-":
          total = parseFloat(numA) - parseFloat(numB);
          break;
        case "/":
          total = parseFloat(numA) / parseFloat(numB);
          break;
        case "*":
          total = parseFloat(numA) * parseFloat(numB);
          break;
        default:
          return;
      }
      setResult(total.toString());
      setNumA(total.toString());
    }
    setNumB("");
    setOperator("");
  }
  // For AC button
  function clear() {
    setNumA("");
    setNumB("");
    setResult(0);
    setOperator("");
    setExpression("0");
  }
  // For number buttons
  function handleNumClick(value) {
    if (!operator) {
      setNumA((prev) => prev + value);
    } else {
      setNumB((prev) => {
        if (parseFloat(prev) === 0 && !prev.includes(".")) {
          return "" + value;
        } else {
          return prev + value;
        }
      });
    }
  }

  return (
    <div className="main-container">
      <h1>React Calculator</h1>
      <div className="display-box">
        <p id="display">{numA ? expression : "0"}</p>
        <p className="result">{result}</p>
      </div>
      <div className="btn-container">
        <button id="clear" onClick={clear}>
          AC
        </button>
        <button className="green" onClick={handlePercentage}>%</button>
        <button className="green" id="divide" onClick={() => handleOperator("/")}>
          ÷
        </button>
        <button id="seven" onClick={() => handleNumClick("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumClick("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumClick("9")}>
          9
        </button>
        <button className="green" id="multiply" onClick={() => handleOperator("*")}>
        ×
        </button>
        <button id="four" onClick={() => handleNumClick("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumClick("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumClick("6")}>
          6
        </button>
        <button className="green" id="subtract" onClick={handleMinus}>
          -
        </button>
        <button id="one" onClick={() => handleNumClick("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumClick("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumClick("3")}>
          3
        </button>
        <button className="green" id="add" onClick={() => handleOperator("+")}>
          +
        </button>
        <button id="zero" onClick={handleZero}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
        <button id="equals" onClick={handleEquals}>
          =
        </button>
      </div>
      <div><p className="bottom-text">Created By: Prashant Thapa</p></div>
    </div>
  );
}
export default App;
