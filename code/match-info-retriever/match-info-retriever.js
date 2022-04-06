/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since Apr 5 2022
 * @desc Creation of an object with a NBA match information
 * @module match-info-retriever     
 */
 'use strict';

 import { readFileSync } from 'fs';

const information = JSON.parse(readFileSync("./code/match-info-retriever/json/fixed_stats.json"));

export default {information};