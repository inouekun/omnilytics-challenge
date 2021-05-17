import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

let downloadFlag = false;

function App() {
  const initialState = {
    alphabetical: 0,
    numbers: 0,
    integers: 0,
    alphanumerics: 0,
  };

  const [link, setLink] = useState(null);
  const [report, setReport] = useState(0);
  const [result, setResult] = useState(null);
  const [reportDetails, setReportDetails] = useState(initialState);

  const resetReportDetails = async () => {
    setReportDetails(initialState);
  };

  const genData = async () => {
    let result = [];
    resetReportDetails();

    // 100 - 8KB
    // 26000 - 2MB
    for (let i = 0; i < 26000; i++) {
      result.push(genAlphas(true)); // Alphabetical strings
      result.push(genNumbers(false)); // Real numbers
      result.push(genAlphas(false)); // Alphanumerics
      result.push(genNumbers(true)); // Integers
      setReportDetails({
        alphabetical: reportDetails.alphabetical + i,
        numbers: reportDetails.numbers + i,
        integers: reportDetails.integers + i,
        alphanumerics: reportDetails.alphanumerics + i,
      });
    }

    setResult(result);
  };

  // 26 bytes - Letters only
  // 36 bytes - Alphanumerics
  const genAlphas = (lettersOnly) => {
    const randomLetters = 'abcdefghijklmnopqrstuvwxyz';
    const randomAlphanumerics = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';

    if (lettersOnly) {
      for (var i = 0; i < randomLetters.length; i++) {
        result += randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
      }
    } else {
      for (var j = 0; j < randomAlphanumerics.length; j++) {
        result += randomAlphanumerics.charAt(Math.floor(Math.random() * randomAlphanumerics.length));
      }
    }
    return result;
  };

  // 5 bytes - whole numbers
  // 7 bytes - integers
  const genNumbers = (decimal) => {
    const result = Math.floor(Math.random() * 5000) + 1000; // Math.floor(Math.random() * (max - min + 1)) + min;
    const precision = 100; // 2 decimals
    const resultWithDecimal = Math.floor(Math.random() * (5000 * precision - 1 * precision) + 1000 * precision) / (1 * precision);

    return decimal ? resultWithDecimal : result;
  };

  const downloadTxtFile = async () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);

    element.download = 'result.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    setLink(element.href); // display link
    element.click();
  };

  useEffect(() => {
    if (result && !downloadFlag) {
      downloadTxtFile();
      downloadFlag = true;
    }
  }, [result, downloadFlag]);

  return (
    <div className='container'>
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <Button
            variant='primary'
            onClick={() => {
              downloadFlag = false; // reset flag
              genData();
            }}
          >
            Generate
          </Button>
          <p>
            Link:{' '}
            {!link ? (
              'N/A'
            ) : (
              <a href={link} target='_blank' rel='noreferrer'>
                {link}
              </a>
            )}
          </p>
          <Button variant='primary' onClick={() => setReport(1)}>
            Report
          </Button>
          {report === 1 ? (
            <p>
              Alphabetical string: {reportDetails.alphabetical}
              <br />
              Real numbers: {reportDetails.numbers}
              <br />
              Integers: {reportDetails.integers}
              <br />
              Alphanumerics: {reportDetails.alphanumerics}
              <br />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
