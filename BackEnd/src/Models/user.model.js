import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    avatarUrl: {
      type: String,
      default: 'https://100k-faces.glitch.me/random-image',
    },
    memberSince: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Allowed roles
        default: 'user' // Default role
    },
    isVerified: { type: Boolean, default: false },
    // verificationToken & VerificationExpiresAt both help to test that person is real authenticated person. (mail send)
    verificationToken: { type: String },
    verificationExpiresAt: { type: Date },
    refreshToken: {
        type: String
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


//Don't try to use arrow functions as objects can not be ascessed with arrow functions.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Methods to create Accesstoken & RefreshToken
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            // { expiresIn: '1d' }  // 1 days
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}

export const User = mongoose.model('User', userSchema);
