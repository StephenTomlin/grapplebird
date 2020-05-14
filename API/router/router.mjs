'use strict';
import { router } from '../server.mjs';
import api from './api.mjs';


router.get('/', api.basicAPICall);