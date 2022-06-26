/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Apr 28 2022
 * @desc 
 * @module       
 */

 'use strict';

 import { fileURLToPath } from 'url';
 import { readFileSync } from 'fs';

function main() {
  let keyName;
  if (process.argv[2] === undefined){
    keyName = 'fecha';
  }
  else {
    keyName = process.argv[2];
  }
  
  findValues("./code/evaluacion/datos.json", keyName);
}

/**
 * @desc Función para obtener todos los valores de una determinada key
 * @param {String} fileName - nombre o path del fichero del cual obtener los datos
 * @param {String} keyName - key a buscar
 */
function findValues(fileName, keyName) {
  const data = JSON.parse(readFileSync(fileName));
  for (const object of data) {
    for (const property in object) {
      if (property === keyName) {
        console.log(object[property]);
      }
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}