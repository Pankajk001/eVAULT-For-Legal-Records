import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
  },
  operationPerformed: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.models.Activity ||mongoose.model('Activity', activitySchema);

export default Activity;
