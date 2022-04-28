/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @author Roberto Carrazana Pernía
  * @since March 29 2022
  * @desc Put quotes on object fields name
  * @module fix-json
  */
 
 'use strict';

 import { createReadStream } from 'fs';
 import { createInterface } from 'readline';

 const NO_CHARACTER = '';
 const WHITESPACE = ' ';
 const INDENTATION = '  ';

/**
 * @desc Dado el nombre de un fichero JSON, añadirá comillas dobles ("") a todos aquellos nombres
 * de campos que no las tengan. Imprimirá por consola el resultado obtenido.
 * @param {String} fileName - nombre/path de un fichero de texto
 */
async function addQuotes (fileName) {
  if (process.argv[2] === undefined) {
    throw new Error('La entrada de este programa requiere un fichero.\nEjecútelo de la siguiente manera: node fix-json.js fichero.txt');
  }
  let splitLine = NO_CHARACTER;
  let wholeDocument = NO_CHARACTER;
  let actualIndentation = 0;

  const fileStream = createReadStream(fileName);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {    
    if (line !== NO_CHARACTER) {
      splitLine = line.split(WHITESPACE);
      for (const word of splitLine) {
        if ((word === '{') || (word === '[')) {
          for (let i = 0; i < actualIndentation; ++i) wholeDocument += INDENTATION;
          ++actualIndentation;
          wholeDocument += word;
          continue;
        }
        else if ((word === '}') || (word === '},') || (word === ']')) {
          --actualIndentation;
          for (let i = 0; i < actualIndentation; ++i) wholeDocument += INDENTATION;
        }
        else if ((word !== NO_CHARACTER) && (word.includes(':'))) {
          word = `"${word.replace(/:/g, NO_CHARACTER)}": `;
          for (let i = 0; i < actualIndentation; ++i) wholeDocument += INDENTATION;
        }        
        wholeDocument += word;
      }
      wholeDocument += '\n';
    }      
  }
  console.log(wholeDocument);
}
addQuotes(process.argv[2]).then(console.log, console.log(process.argv[2]));

export default {addQuotes}