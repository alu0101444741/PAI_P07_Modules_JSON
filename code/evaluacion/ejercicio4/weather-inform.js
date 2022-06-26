/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Apr 28 2022
 * @desc ...
 * @module weather-inform      
 */

 'use strict';

 import { fileURLToPath } from 'url';
 import { readFileSync } from 'fs';

function main() {   
  weatherInform("./code/evaluacion/ejercicio4/sc-weather-data.json");
}

/**
 * @desc Función para obtener el día y hora donde se alcanzaron las mayores y menores temperaturas.
 * Se añade el día con mayor precipitación y el periodo más largo sin lluvia.
 * @param {String} fileName - nombre o path del fichero del cual obtener los datos
 */
 function weatherInform(fileName) {
    const data = JSON.parse(readFileSync(fileName));
    let maxTemperatureDate = '';
    let minTemperatureDate = '';
    let maxTemperature = -Infinity;
    let minTemperature = Infinity;
    let mostRainyDay = '';
    let maxRain = -Infinity;
    let maxNoRain = 0;
    let noRainCounter = 0;
    for (const object of data) {
      if (parseFloat(object.tmax) > maxTemperature) {
        maxTemperatureDate = object.fecha + ' ' + object.horatmax;
        maxTemperature = parseFloat(object.tmax);
      }
      if (parseFloat(object.tmin) < minTemperature) {
        minTemperatureDate = object.fecha + ' ' + object.horatmin;
        minTemperature = parseFloat(object.tmin);
      }
      if (parseFloat(object.prec) > maxRain) {
        mostRainyDay = object.fecha;
        maxRain = parseFloat(object.tmax);
      }
      if (parseFloat(object.prec) === 0) {
        noRainCounter++;
      }
      else {
        if (noRainCounter > maxNoRain) {
          maxNoRain = noRainCounter;
        }        
        noRainCounter = 0;        
      }
    }
    console.log(`* Fecha con mayor temperatura: ${getDate(maxTemperatureDate)} (${maxTemperature}ºC).`);
    console.log(`* Fecha con menor temperatura: ${getDate(minTemperatureDate)} (${minTemperature}ºC).`);
    console.log(`* Día con mayor precipitación: ${getDate(mostRainyDay).substring(0,13)} (${maxRain}mm).`);
    console.log(`* Máximo periodo sin lluvia: ${maxNoRain} días.`);
  }

/**
 * @desc Construcción de una cadena con la información de una fecha
 * @param {String} date - fecha con formato 'AAAA-MM-DD HH-MM'
 * @param {String} - la misma fecha formateada
 */
 function getDate(date) {
  let year = date.substring(0,4);
  let month = getMonth(date.substring(5,7));
  let day = date.substring(8,10);
  return(`${day} de ${month} de ${year} a las ${date.substring(11,16)}`);
}

/**
 * @desc Función para obtener el nombre del mes según una cadena con un número
 * @param {String} month - cadena con un número del 1 al 12
 */
 function getMonth(month) {
  switch(month) {
      case '01' : return 'enero' ; break;
      case '02' : return 'febrero' ; break;
      case '03' : return 'marzo' ; break;
      case '04' : return 'abril' ; break;
      case '05' : return 'mayo' ; break;
      case '06' : return 'junio' ; break;
      case '07' : return 'julio' ; break;
      case '08' : return 'agosto' ; break;
      case '09' : return 'septiembre' ; break;
      case '10' : return 'octubre' ; break;
      case '11' : return 'noviembre' ; break;
      case '12' : return 'diciembre' ; break;
      default: return '' ; break;
  }
}

  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
  }