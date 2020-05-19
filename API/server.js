// 'use strict';
import cluster from 'cluster';
import http from 'http';
import OS from 'os';
// import path from 'path';
import app from './main.js';

// // TODO: MAKE THIS READ FROM DOTENV, DOTENV WILL READ FROM CERT.

const PORT      = process.env.PORT || 8080;
const creds     = { key: 'privatekey', cert: 'privatecert' };

// // if cluster is master
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const CPUs = OS.cpus();
    CPUs.forEach(cluster.fork);

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