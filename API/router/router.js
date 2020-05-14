'use strict';
import { router } from '../server.js';
import api from './api.js';

router.get('/', api.basicAPICall);

export default router;