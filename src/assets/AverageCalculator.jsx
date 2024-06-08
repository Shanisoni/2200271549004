import { useState } from "react";

// Hardcoded data for different number types
const hardcodedData = {
  p: {
    windowPrevState: [1, 2, 3],
    windowCurrState: [4, 5, 6],
    numbers: [2, 3, 5, 7, 11],
    avg: 5.6,
  },
  f: {
    windowPrevState: [0, 1, 1],
    windowCurrState: [2, 3, 5],
    numbers: [1, 1, 2, 3, 5, 8, 13],
    avg: 4.714,
  },
  e: {
    windowPrevState: [2, 4, 6],
    windowCurrState: [8, 10, 12],
    numbers: [2, 4, 6, 8, 10, 12],
    avg: 7,
  },
  r: {
    windowPrevState: [0, 5, 9],
    windowCurrState: [3, 7, 11],
    numbers: [4, 8, 15, 16, 23, 42],
    avg: 18,
  },
};

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleNumberTypeChange = (e) => {
    setNumberType(e.target.value);
    setResponse(null); // Clear previous response when number type changes
    setError(""); // Clear previous error when number type changes
  };

  const fetchNumbers = async () => {
    try {
      if (hardcodedData[numberType]) {
        setResponse(hardcodedData[numberType]);
        setError("");
      } else {
        throw new Error("Invalid number type selected");
      }
    } catch (err) {
      setError("Error fetching data");
      setResponse(null);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <div>
        <label>Select Number Type: </label>
        <select value={numberType} onChange={handleNumberTypeChange}>
          <option value="">Select</option>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchNumbers} disabled={!numberType}>
          Fetch Numbers
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {response && (
        <div>
          <h2>Response</h2>
          <div>
            <strong>Previous Window State:</strong>{" "}
            {JSON.stringify(response.windowPrevState)}
          </div>
          <div>
            <strong>Current Window State:</strong>{" "}
            {JSON.stringify(response.windowCurrState)}
          </div>
          <div>
            <strong>Fetched Numbers:</strong> {JSON.stringify(response.numbers)}
          </div>
          <div>
            <strong>Average:</strong> {response.avg}
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
