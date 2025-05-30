import express from 'express';
import * as travelDiaryController from '../../controllers/travelDiaryController.js';
console.log('travelDiaryController:', travelDiaryController);

const router = express.Router();

router.get('/:id', travelDiaryController.getTravelDiaryById);
router.post('/', travelDiaryController.createTravelDiary);
router.get('/', travelDiaryController.getAllTravelDiaries);
router.put('/:id', travelDiaryController.updateTravelDiary);
router.delete('/:id', travelDiaryController.deleteTravelDiary);

export const travelDiaryRoutes = router;
