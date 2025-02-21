document.addEventListener('DOMContentLoaded', () => {
  const passwordEl = document.getElementById('password');
  const lengthEl = document.getElementById('length');
  const uppercaseEl = document.getElementById('uppercase');
  const lowercaseEl = document.getElementById('lowercase');
  const numbersEl = document.getElementById('numbers');
  const symbolsEl = document.getElementById('symbols');
  const generateBtn = document.getElementById('generate-btn');
  const copyBtn = document.getElementById('copy-btn');

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };

  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatePassword() {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
      alert('Please select at least one option');
      return '';
    }

    let generatedPassword = '';
    const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;
    const typesArr = [
      { lower: hasLower },
      { upper: hasUpper },
      { number: hasNumber },
      { symbol: hasSymbol },
    ].filter((item) => Object.values(item)[0]);

    for (let i = 0; i < length; i += 1) {
      const funcName = Object.keys(
        typesArr[Math.floor(Math.random() * typesArr.length)]
      )[0];
      generatedPassword += randomFunc[funcName]();
    }

    return generatedPassword;
  }

  generateBtn.addEventListener('click', () => {
    passwordEl.value = generatePassword();
  });

  copyBtn.addEventListener('click', () => {
    if (!passwordEl.value) return;

    passwordEl.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
  });

  // Generate initial password
  passwordEl.value = generatePassword();
});
