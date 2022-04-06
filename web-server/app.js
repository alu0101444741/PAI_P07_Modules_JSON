//const EXPRESS = require('express');
import EXPRESS from 'express';
//const PATH = require('path');
import PATH from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = PATH.dirname(__filename);
const APP = EXPRESS();

//set the port
APP.set('port', 8080);

//tell express that we want to use the www folder
//for our static assets
APP.use(EXPRESS.static(PATH.join(__dirname, '../www')));
APP.use(EXPRESS.static(PATH.join(__dirname, '..')));

// Listen for requests
const SERVER = APP.listen(APP.get('port'), '0.0.0.0', function () {
 console.log('The server is running on http://<your machine IP addr>:' + APP.get('port'));
});

/* 
    Para que el servidor web se mantenga activo:
        nohup sudo -b npm start
*/