import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: [true, "UserName is required"],
  },
  emailId: {
    type: String,
    required: [true, "EmailId is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
