import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import { genAlphas, genNumbers } from './utility';

let downloadFlag = false;

function App() {
  const initialState = {
    alphabetical: 0,
    numbers: 0,
    integers: 0,
    alphanumerics: 0,
  };

  const [link, setLink] = useState(null);
  const [report, setReport] = useState(false);
  const [result, setResult] = useState(null);
  const [reportDetails, setReportDetails] = useState(initialState);

  useEffect(() => {
    if (result && !downloadFlag) {
      downloadTxtFile();
      downloadFlag = true; // Set flag so wont download multiple times
    }
  }, [result, downloadFlag]);

  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);

    element.download = 'result.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    setLink(element.href); // Display link
    return element.click();
  };

  const genData = () => {
    let result = [];
    let stringResult = '';

    // 100 - 8KB
    // 26000 - 2MB
    // 103996 length of Array - 2MB
    for (let i = 1; i < 26000; i++) {
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

      /*
          Cant do checking if exceed 2MB, will hang
          If below works, will randomize output quantity from genAlphas and genNumbers
      */
      // if (result.toString().length >= 2000000) {
      //   break;
      // }
    }

    const newResult = result.toString(); // String length 1998775 ~ 2MB
    setResult(newResult);
  };

  return (
    <div className='container'>
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <Button
            variant='primary'
            onClick={() => {
              downloadFlag = false; // Reset flag
              genData();
            }}
            disabled={result}
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
          <Button variant='primary' disabled={report} onClick={() => setReport(true)}>
            Report
          </Button>
          {report ? (
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
