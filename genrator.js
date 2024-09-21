const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function generatePassword(names, number) {
  const combinedInput = names.join('') + number;
  const hash = crypto.createHash('sha256').update(combinedInput).digest('hex');
  return hash.slice(0, 12);
}

function getInput() {
  rl.question('Enter name(s) separated by commas: ', (namesInput) => {
    rl.question('Enter a number: ', (numberInput) => {
      const names = namesInput.split(',').map(name => name.trim());
      const number = parseInt(numberInput);

      if (isNaN(number)) {
        console.log('Invalid number input. Please try again.');
        getInput();
      } else {
        const password = generatePassword(names, number);
        console.log(`Generated password: ${password}`);
        rl.close();
      }
    });
  });
}

console.log('Password Generator');
getInput();