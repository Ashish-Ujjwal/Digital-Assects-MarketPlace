import UiKit from '../models/uiKit.model.js';

// GET all UI Kits
export const getAllUiKits = async (req, res) => {
  try {
    const uiKits = await UiKit.find();
    res.status(200).json(uiKits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch UI Kits', error });
  }
};

// GET UI Kit by ID
export const getUiKitById = async (req, res) => {
  try {
    const kit = await UiKit.findById(req.params.id);
    if (!kit) return res.status(404).json({ message: 'UI Kit not found' });
    res.status(200).json(kit);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching UI Kit', error });
  }
};

// CREATE new UI Kit
export const createUiKit = async (req, res) => {
  try {
    const newKit = new UiKit(req.body);
    const savedKit = await newKit.save();
    res.status(201).json(savedKit);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create UI Kit', error });
  }
};

// UPDATE UI Kit
export const updateUiKit = async (req, res) => {
  try {
    const updatedKit = await UiKit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedKit) return res.status(404).json({ message: 'UI Kit not found' });
    res.status(200).json(updatedKit);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update UI Kit', error });
  }
};

// DELETE UI Kit
export const deleteUiKit = async (req, res) => {
  try {
    const deleted = await UiKit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'UI Kit not found' });
    res.status(200).json({ message: 'UI Kit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting UI Kit', error });
  }
};

// GET featured UI Kits
export const getFeaturedUiKits = async (req, res) => {
  try {
    const featured = await UiKit.find({ featured: true });
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch featured UI Kits', error });
  }
};

export const getAllCategories = async (req, res) => {
    try {
      const categories = await UiKit.distinct('category');
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching product categories:', error.message);
      res.status(500).json({ message: 'Server error while fetching categories from products' });
    }
  };

// GET UI Kits by category
export const getUiKitsByCategory = async (req, res) => {
  try {
    const kits = await UiKit.find({ category: req.params.category });
    res.status(200).json(kits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch UI Kits by category', error });
  }
};

// SEARCH UI Kits
export const searchUiKits = async (req, res) => {
  const query = req.query.q;
  try {
    const kits = await UiKit.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
        { tags: new RegExp(query, 'i') }
      ]
    });
    res.status(200).json(kits);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error });
  }
};

// GET reviews for a UI Kit
export const getUiKitReviews = async (req, res) => {
  try {
    const kit = await UiKit.findById(req.params.id);
    if (!kit) return res.status(404).json({ message: 'UI Kit not found' });
    res.status(200).json(kit.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};

// ADD review to a UI Kit
export const addReviewToUiKit = async (req, res) => {
  try {
    const kit = await UiKit.findById(req.params.id);
    if (!kit) return res.status(404).json({ message: 'UI Kit not found' });

    kit.reviews.push(req.body);
    kit.reviewCount = kit.reviews.length;
    // Optional: update average rating
    const totalRating = kit.reviews.reduce((sum, r) => sum + r.rating, 0);
    kit.rating = parseFloat((totalRating / kit.reviews.length).toFixed(1));

    await kit.save();
    res.status(201).json({ message: 'Review added', reviews: kit.reviews });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add review', error });
  }
};
