/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Apr 5 2022
 * @desc Show information about a NBA match
 * @module basket-stats      
 */

'use strict';

import { fileURLToPath } from 'url';
import information from '../match-info-retriever/match-info-retriever.js';

const MATCH_INFORMATION = information.information;

function main() {
  matchId();
  allPlayerProperties();
  finalResult();
  maximumRebounder();
  highestTriplePointerPercentageGuard();
  playersWithAtLeastOneAssist();
  teamWithMostFreeShots();
  playersWithMoreTurnoversThanAssists();
}

/** @desc Muestra por pantalla el identificador del partido. */
function matchId() {
  console.log('* Game ID:', MATCH_INFORMATION['id']);  
}

/** @desc Muestra por pantalla las propiedades (nombre, dorsal, ...) de cada jugador. */
function allPlayerProperties() {
  console.log('* Players properties:\n')
  for (const player of MATCH_INFORMATION['players']) {
    for (const property in player) {
      console.log(`${property}: ${player[property]}`);
    }
    console.log();
  }  
}

/**
 * @desc Muestra por pantalla el resultado final del partido. El resultado final de
 * cada equipo se consigue sumando los puntos obtenidos por cada jugador del mismo.
 */
function finalResult() {
  let pacersScore = 0;
  let hawksScore = 0;
  console.log('* Final result:');
  for (const player of MATCH_INFORMATION['players']) {
    if (player['teamName'] === 'Pacers') {
      pacersScore += (player['threePointersMade'] * 3 + (player['fieldGoalsMade'] - player['threePointersMade']) * 2 + player['freeThrowsMade']);
    }
    else {
      hawksScore += (player['threePointersMade'] * 3 + (player['fieldGoalsMade'] - player['threePointersMade']) * 2 + player['freeThrowsMade']); 
    }       
  }
  console.log('  Pacers', pacersScore);
  console.log('  Hawks', hawksScore);
}

/**
 * @desc Muestra por pantalla el jugador con mayor cantidad de rebotes efectuados en el partido.
 * Esta cantidad se consigue sumando los rebotes defensivos y ofensivos.
 */
function maximumRebounder() {
  let maximumRebounder = '';
  let maximumRebounds = 0;
  for (const player of MATCH_INFORMATION['players']) {
    let rebounds = player['reboundsOffensive'] + player['reboundsDefensive'];
    if (rebounds > maximumRebounds) {
      maximumRebounder = `${player['firstName']} ${player['lastName']}`;
      maximumRebounds = rebounds;
    }      
  }
  console.log(`* Most rebounds: ${maximumRebounder} with ${maximumRebounds}`);
}

/**
 * @desc Muestra por pantalla el Escolta con mayor porcentaje de triples acertados
 * frente a los intentados.
 */
 function highestTriplePointerPercentageGuard() {
  let guardName = '';
  let maximumPercentage = 0.0;
  let threePointersMade, threePointersAttempted;
  for (const player of MATCH_INFORMATION['players']) {
    if (player['positionShort'] !== 'G') continue;

    let percentage = (player['threePointersMade'] / player['threePointersAttempted']).toFixed(2);
    if (percentage > maximumPercentage) {
      guardName = `${player['firstName']} ${player['lastName']}`;
      maximumPercentage = percentage;
      threePointersMade = player['threePointersMade'];
      threePointersAttempted = player['threePointersAttempted'];
    }      
  }
  maximumPercentage = (maximumPercentage * 100).toFixed(2);
  console.log(`* Guard (G) with highest 3 point percentage: ${guardName} at %${maximumPercentage} (${threePointersMade}/${threePointersAttempted})`);
}

/**
 * @desc Muestra por pantalla la cantidad de jugadores con al menos una asistencia.
 */
 function playersWithAtLeastOneAssist() {
  let playersWithAssists = 0;
  for (const player of MATCH_INFORMATION['players']) {
    if (player['assists'] > 0) {
      ++ playersWithAssists;
    }     
  }
  console.log(`* There were ${playersWithAssists} players that had at least one assist.`);
}

/**
 * @desc Muestra por pantalla el equipo con mayor cantidad de tiros libres intentados.
 * Se incluye la cantidad de lanzamientos intentados por parte de ambos equipos.
 */
 function teamWithMostFreeShots() {
  let freeShotsPacers = 0;
  let freeShotsHawks = 0;
  let teamName = '';
  for (const player of MATCH_INFORMATION['players']) {
    if (player['teamName'] === 'Pacers') {
      freeShotsPacers += player['freeThrowsAttempted'];
    }
    else {
      freeShotsHawks += player['freeThrowsAttempted'];
    }
  }
  teamName = (freeShotsPacers > freeShotsHawks) ? 'Pacers' : 'Hawks';
  console.log(`* ${teamName} attempted the most free throws... Pacers: ${freeShotsPacers} Hawks: ${freeShotsHawks}`);
}

/**
 * @desc Muestra por pantalla los jugadores de ambos equipos con menos asistencias
 * que pérdidas de balón.
 */
 function playersWithMoreTurnoversThanAssists() {
  let playersPacers = [];
  let playersHawks = [];
  for (const player of MATCH_INFORMATION['players']) {
    if (player['assists'] < player['turnovers']) {
      if (player['teamName'] === 'Pacers') {
        playersPacers.push(player);
      }
      else {
        playersHawks.push(player);
      }
    }
  }
  console.log('* Pacers players with more turnovers than assists:');
  for (const player of playersPacers) {
    console.log(`    * ${player['firstName']} ${player['lastName']} has an assist to turnover ratio of ${player['assists']}:${player['turnovers']}`);
  }

  console.log('* Hawks players with more turnovers than assists:');
  for (const player of playersHawks) {
    console.log(`    * ${player['firstName']} ${player['lastName']} has an assist to turnover ratio of ${player['assists']}:${player['turnovers']}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export {
  matchId,
  allPlayerProperties,
  finalResult,
  maximumRebounder,
  highestTriplePointerPercentageGuard,
  playersWithAtLeastOneAssist,
  teamWithMostFreeShots,
  playersWithMoreTurnoversThanAssists
};