const downloadTxtFile = () => {
  console.log('test');
  const element = document.createElement('a');
  const file = new Blob([document.getElementById('myInput').value], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'result.txt';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
