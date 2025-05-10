import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['sale', 'purchase', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
