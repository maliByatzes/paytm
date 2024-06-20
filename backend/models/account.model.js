import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);

export default Account;
