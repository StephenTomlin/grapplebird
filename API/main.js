'use strict';
import morgan from 'morgan';
import router from './router/router.js';
import { app, express } from './server.js';
import path from 'path';

//serve static files
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Logger Middleware
app.use(morgan('tiny'));

// Router
app.use(router);