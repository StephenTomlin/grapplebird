'use strict';
import morgan from 'morgan';
import router from './router/router.mjs';
import { app } from './server.mjs';


app.use(morgan('tiny'));
app.use(router);
