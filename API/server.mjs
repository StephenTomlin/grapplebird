"use strict"
// const cluster = require("cluster");
// const https = require("https");
// const CPUs = require('os').cpus().length;

import cluster from 'cluster';
// import https from 'https';
import http from 'http';
import OS from 'os';
import express from 'express'



const credentials = {
    key: 'privatekey', // HTTPS certificate private key,
    cert: 'privatecert' // HTTPS certificate,
}


// if cluster is master
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // fork workers.
    let CPUs = OS.cpus().length;
    for (let i = 0; i < CPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Workers can share any tcp connection
    // in this case it is an HTTPS server
    const app = express();
    app.server = http
        .createServer(app)
        .listen(8080);

    app.get('/', (req, res) => {
        res.send("HELLO LAURA");
        res.end();
    })
}

// module.exports = app;