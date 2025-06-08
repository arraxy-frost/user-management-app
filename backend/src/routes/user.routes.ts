import { Router } from "express";
import * as userController from '../controllers/user.controller';
import checkRole from '../middlewares/check-role.middleware'
import { Roles } from '../shared/enums/Roles'

const router = Router();

router.get('/', checkRole([Roles.ADMIN]), userController.getUsers);
router.get('/:id', checkRole([Roles.ADMIN]), userController.getUserById);
router.post('/', checkRole([Roles.ADMIN]), userController.createUser);
router.patch('/:id', checkRole([Roles.ADMIN]), userController.updateUser);
router.delete('/:id', checkRole([Roles.ADMIN]), userController.deleteUser);

export default router;