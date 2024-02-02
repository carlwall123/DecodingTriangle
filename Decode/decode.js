const fs = require('fs');

function decode(textFile) {
  fs.readFile(textFile, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const numberWordMap = new Map(data.split('\n')
                                      .filter(Boolean) 
                                      .map(line => {
                                        const [number, word] = line.trim().split(' ');
                                        return [parseInt(number), word.toLowerCase()];
                                      }));

    const decodedMessage = Array.from({length: numberWordMap.size}, (_, i) => i + 1)
                                .filter(number => numberWordMap.has(number) && isTriangle(number))
                                .map(number => numberWordMap.get(number))
                                .join(' ');

    console.log(decodedMessage);
  });
}

function isTriangle(number) {
  const n = Math.floor((Math.sqrt(8 * number + 1) - 1) / 2);
  return number === n * (n + 1) / 2;
}

decode('textfile.txt');