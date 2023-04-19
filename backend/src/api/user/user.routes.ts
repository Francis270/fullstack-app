import { Router } from 'express';

import ValidateRequest from '../../middlewares/ValidateRequest';
import * as userController from './user.controller';
import { RegisterSchema } from './user.validation';
import { Auth, AuthAdmin } from '../../middlewares/Auth';

const router = Router();

router.post('/register', ValidateRequest({ body: RegisterSchema }), AuthAdmin, userController.register);
router.post('/login', userController.login);

router.get('/:username', userController.getUser);
router.put('/:username', Auth, userController.updateUser);
router.delete('/:username', Auth, userController.deleteUser);
router.get('/config', Auth, userController.getUserConfig);

export default router;