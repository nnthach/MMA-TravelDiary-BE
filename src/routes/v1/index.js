import express from 'express';
import { userRoutes } from './userRoutes.js';
import { travelDiaryRoutes } from './travelDiaryRoutes.js';

const router = express.Router();

router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs v1 are ready to use.', code: 200 });
});

router.use('/users', userRoutes);
router.use('/travelDiary', travelDiaryRoutes);

export const APIs_V1 = router;
