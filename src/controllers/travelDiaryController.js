import { GET_DB } from '../config/mongodb.js';
import { ObjectId } from 'mongodb';

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

export const getAllTravelDiaries = async (req, res) => {
  try {
    const db = GET_DB();
    const diaries = await db.collection('traveldiaries').find({}).toArray();
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTravelDiary = async (req, res) => {
  console.log('Request body:', req.body);  // kiểm tra dữ liệu gửi lên
  try {
    const db = GET_DB();
    const newDiary = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl || null,
      location: req.body.location || null,
      createdAt: new Date(),
    };

    const result = await db.collection('traveldiaries').insertOne(newDiary);
    const insertedDiary = await db.collection('traveldiaries').findOne({ _id: result.insertedId });

    res.status(201).json(insertedDiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getTravelDiaryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid diary id' });
    }

    const db = GET_DB();
    const diary = await db.collection('traveldiaries').findOne({ _id: new ObjectId(id) });

    if (!diary) return res.status(404).json({ message: 'Diary not found' });

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTravelDiary = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid diary id' });
    }

    const db = GET_DB();
    const update = { $set: req.body };
    const result = await db.collection('traveldiaries').findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: 'after' }
    );

    if (!result.value) return res.status(404).json({ message: 'Diary not found' });

    res.json(result.value);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTravelDiary = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid diary id' });
    }

    const db = GET_DB();
    const result = await db.collection('traveldiaries').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'Diary not found' });

    res.json({ message: 'Diary deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
