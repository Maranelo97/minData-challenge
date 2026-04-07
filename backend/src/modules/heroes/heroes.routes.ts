import { Router } from 'express';
import * as HeroController from './heroes.controller';
import { authenticateToken } from '../../core/middlewares/auth.middleware';

const router = Router();

router.get('/', HeroController.getHeroes);
router.get('/:id', HeroController.getHeroById);
router.post('/', HeroController.createHero);
router.put('/:id', HeroController.updateHero);
router.delete('/:id', HeroController.deleteHero);

export default router;