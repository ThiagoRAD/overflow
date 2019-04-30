const isPrime = (number) => {
  if (number <= 3) return true
  for (let i = 4; i < number; i++) {
    if (number % i == 0) return false
  }
  return true
}
const sumCharacterCodes = (str) => {
  return str.split('').filter((_, index) => isPrime(index)).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

const s = 'TypeScript3.9'
console.log(sumCharacterCodes(s)); 
