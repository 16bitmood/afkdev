import { Router } from 'express';

import { login } from './login';
import { manage } from './manage';


export const router = Router();

router.use('/api', login);
router.use('/api', manage);
router.get('/*', (req, res) => {
    res.redirect('/');
});