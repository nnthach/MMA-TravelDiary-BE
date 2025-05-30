import mongoose from 'mongoose';

const TravelDiarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, default: null },  // URL ảnh, có thể null
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
  },
  createdAt: { type: Date, default: Date.now }
});

const TravelDiary = mongoose.model('TravelDiary', TravelDiarySchema);

export default TravelDiary;
