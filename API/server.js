'use strict';
import cluster from 'cluster';
import http from 'http';
import OS from 'os';
import express from 'express';
import path from 'path';

// TODO: MAKE THIS READ FROM DOTENV, DOTENV WILL READ FROM CERT.
const app       = express();
const router    = express.Router();
const PORT      = process.env.PORT || 8080;
const creds     = { key: 'privatekey', cert: 'privatecert' };

// if cluster is master
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // fork workers.
    const CPUs = OS.cpus();
    CPUs.forEach(() => cluster.fork());

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died. Forking another worker...`);
        cluster.fork();
    });
} else {
    // Workers can share any tcp connection
    // in this case it is an HTTPS server
    //TODO CHANGE TO HTTPS
    app.server = http
        .createServer(app)
        .listen(PORT);
}

export { app, router, express };