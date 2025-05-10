import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  userName: String,
  userAvatar: String,
  rating: { type: Number, min: 1, max: 5 },
  date: Date,
  content: String
});

const AuthorSchema = new mongoose.Schema({
  id: String,
  name: String,
  avatar: String,
  bio: String,
  followers: Number,
  memberSince: Date
});

const SellerSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  totalProducts: Number,
  rating: Number,
  location: String,
  responseTime: String,
  salesCount: Number,
  memberSince: Date
});

const UiKitSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviewCount: Number,
  category: String,
  featured: Boolean,
  isNew: Boolean,
  onSale: Boolean,
  licenseType: String,
  lastUpdated: Date,
  compatibleSoftware: [String],
  author: AuthorSchema,
  images: [String],
  specifications: {
    type: Map,
    of: String
  },
  reviews: [ReviewSchema],
  sku: String,
  inStock: Boolean,
  soldCount: Number,
  viewCount: Number,
  features: [String],
  seller: SellerSchema,
  tags: [String]
}, {
  timestamps: true
});

export default mongoose.model('UiKit', UiKitSchema);
