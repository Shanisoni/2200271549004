import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/numbers';

const AverageCalculator = () => {
  const [numberType, setNumberType] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleNumberTypeChange = (e) => {
    setNumberType(e.target.value);
  };

  const fetchNumbers = async () => {
    try {
      const result = await axios.get(${API_BASE_URL}/${numberType});
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Error fetching data. Please try again.');
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
        <button onClick={fetchNumbers} disabled={!numberType}>Fetch Numbers</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {response && (
        <div>
          <h2>Response</h2>
          <div>
            <strong>Previous Window State:</strong> {JSON.stringify(response.windowPrevState)}
          </div>
          <div>
            <strong>Current Window State:</strong> {JSON.stringify(response.windowCurrState)}
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