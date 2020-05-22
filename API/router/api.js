import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../src/App.js';

export default class {
    static basicAPICall = (req, res, next) => {
        try {
            fs.readFile(path.resolve('./dist/build/index.html'), 'utf-8', (err, data) => {
                if (err) throw err;

                return res.send(
                    data.replace(
                        '<div id="root"></div>', 
                        `<div id="root">${ReactDOMServer.renderToNodeStream(<App />)}</div>`
                    )
                );
            });
        } catch (err) {            
            return res
                .status(500)
                .send('Something went wrong!');
        }
    }
}