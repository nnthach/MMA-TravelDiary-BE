import { GET_DB } from '../config/mongodb.js';
import { ObjectId } from 'mongodb';

export const getAllUsers = async (req, res) => {
  try {
    const db = GET_DB();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const db = GET_DB();
    const { username, email, password } = req.body;
    const newUser = { username, email, password, createdAt: new Date() };

    const result = await db.collection('users').insertOne(newUser);

    // Lấy lại tài liệu vừa insert để trả về
    const insertedUser = await db.collection('users').findOne({ _id: result.insertedId });

    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const isValidObjectId = (id) => ObjectId.isValid(id) && (String)(new ObjectId(id)) === id;

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const db = GET_DB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const db = GET_DB();
    const update = { $set: req.body };
    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: 'after' }
    );

    if (!result.value) return res.status(404).json({ message: 'User not found' });

    res.json(result.value);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const db = GET_DB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};