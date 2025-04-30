import mongoose from 'mongoose';
import User from './User';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
