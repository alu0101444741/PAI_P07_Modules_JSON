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
  
  stationHeights("./code/evaluacion/inventario.json");
}

/**
 * @desc Función para obtener las estaciones con mayor y menor altitud
 * @param {String} fileName - nombre o path del fichero del cual obtener los datos
 */
 function stationHeights(fileName) {
  const data = JSON.parse(readFileSync(fileName));
  let maxHeightName = '';
  let minHeightName = '';
  let maxHeight = -Infinity;
  let minHeight = Infinity;
  let nameList = new Set();
  for (const object of data) {
    for (const property in object) {
      if (property === 'altitud') {
        if (Number(object[property]) > maxHeight) {
          maxHeightName = object['indicativo'] + ' ' + object['nombre'];
          maxHeight = Number(object[property]);
        }
        if (Number(object[property]) < minHeight) {
          minHeightName = object['indicativo'] + ' ' + object['nombre'];
          minHeight = Number(object[property]);
        }
      }
      if (object['provincia'] === 'STA. CRUZ DE TENERIFE') {
        nameList.add(object['nombre']);        
      }
    }
  }
  console.log(`La estación con mayor altitud es ${maxHeightName} (${maxHeight}m).`);
  console.log(`La estación con menor altitud es ${minHeightName} (${minHeight}m).`);
  console.log('Lista de estaciones de Tenerife: \n');
  for (const station of nameList) console.log('  *', station);  
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}