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
  
  mostLeastRain("./code/evaluacion/datos.json");
}

/**
 * @desc Función para obtener todos los valores de una determinada key
 * @param {String} fileName - nombre o path del fichero del cual obtener los datos
 */
function mostLeastRain(fileName) {
  const data = JSON.parse(readFileSync(fileName));
  let mostRainy = '';
  let leastRainy = '';
  let maxRain = 0;
  let minRain = 100;
  for (const object of data) {
    for (const property in object) {
      if ((object['fecha'] !== '2021-13') && (property === 'n_llu')) {
        if (Number(object[property]) > maxRain) {
            mostRainy = object['fecha'];
            maxRain = Number(object[property]);
        }
        if (Number(object[property]) < minRain) {
            leastRainy = object['fecha'];
            minRain = Number(object[property]);
        }
      }
    }
  }
  mostRainy = getMonth(mostRainy.charAt(mostRainy.length - 1));
  leastRainy = getMonth(leastRainy.charAt(leastRainy.length - 1));
  
  console.log('El mes más lluvioso fue', mostRainy, ', llovió en', maxRain, 'días distintos.');
  console.log('El mes menos lluvioso fue', leastRainy,', llovió en', minRain, 'días distintos.');
}

/**
 * @desc Función para obtener el nombre del mes según una cadena con un número
 * @param {String} fileName - nombre o path del fichero del cual obtener los datos
 */
function getMonth(month) {
    switch(month) {
        case '1' : return 'enero' ; break;
        case '2' : return 'febrero' ; break;
        case '3' : return 'marzo' ; break;
        case '4' : return 'abril' ; break;
        case '5' : return 'mayo' ; break;
        case '6' : return 'junio' ; break;
        case '7' : return 'julio' ; break;
        case '8' : return 'agosto' ; break;
        case '9' : return 'septiembre' ; break;
        case '10' : return 'octubre' ; break;
        case '11' : return 'noviembre' ; break;
        case '12' : return 'diciembre' ; break;
        default: return '' ; break;
    }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}