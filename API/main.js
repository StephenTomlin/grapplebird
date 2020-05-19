"use strict";
import router from './router/router.js';
import express from 'express';
import bodyparser from 'body-parser';
import morgan from 'morgan'
import cors from 'cors';
import path from 'path';



export default express()
    // use cors() or whitelist
    .use(cors())
    //disable x-powered-by
    .disable('x-powered-by')

    //serve static files
    .use(express.static(path.resolve(__dirname, '..', 'dist')))

    //use bodyparser //urlencoded extended true
    .use(bodyparser.json())
    .use(bodyparser.urlencoded({extended: true}))

    //consider JWT AND OAUTH

    //verifytoken

    //base path to api;
    .use('/', router)

    //logger
    .use(morgan('tiny'))

    //catch everything else and sned a 404 status code
    .all('*', (req, res) => {
        res.status(404)
            .json({
                Status: false,
                Message: 'Not Found',
                Error: 'What you are looking for is not here.'
        });
    })

    //Error Handler
    .use((err, req, res, next) => {
        res.status(500)
            .json({
                Status: false,
                Message: 'Internal Server Error',
                Error: 'OOOOP!'
        });
});
