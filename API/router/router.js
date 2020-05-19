'use strict';
import express from 'express';
import api from './api.js';

export default express.Router()
    .get('/', api.basicAPICall);