'use strict';
import cluster from 'cluster';
import http from 'http';
import OS from 'os';
import express from 'express';

const router = express.Router();

// TODO: MAKE THIS READ FROM DOTENV, DOTENV WILL READ FROM CERT.
const credentials = {
    key: 'privatekey', 
    cert: 'privatecert' 
}

const app = express();

// if cluster is master
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // fork workers.
    const CPUs = OS.cpus();
    CPUs.forEach(() => cluster.fork());

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Workers can share any tcp connection
    // in this case it is an HTTPS server

    //TODO CHANGE TO HTTPS
    app.server = http
        .createServer(app)
        .listen(8080);
    
}

export { app, router };