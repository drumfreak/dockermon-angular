import { Injectable } from '@angular/core';

@Injectable()
export class GeneratePasswordService {
  generatePassword(length: number, upper: boolean, numbers: any, symbols: any) {
    const passwordLength = length || 12;
    const addUpper = upper;
    const addNumbers = numbers;
    const addSymbols = symbols;

    const lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    symbols = ['!', '?', '@'];

    const getRandom = (array: any[]) => array[Math.floor(Math.random() * array.length)];

    let finalCharacters = '';

    if (addUpper) {
      finalCharacters = finalCharacters.concat(getRandom(upperCharacters));
    }

    if (addNumbers) {
      finalCharacters = finalCharacters.concat(getRandom(numbers));
    }

    if (addSymbols) {
      finalCharacters = finalCharacters.concat(getRandom(symbols));
    }

    for (let i = 1; i < passwordLength - 3; i++) {
      finalCharacters = finalCharacters.concat(getRandom(lowerCharacters));
    }

    return finalCharacters
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }
}
