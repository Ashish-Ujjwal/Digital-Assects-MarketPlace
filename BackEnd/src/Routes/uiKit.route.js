import express from 'express';
import {
  getAllUiKits,
  getUiKitById,
  createUiKit,
  updateUiKit,
  deleteUiKit,
  getAllCategories,
  getFeaturedUiKits,
  getUiKitsByCategory,
  searchUiKits,
  getUiKitReviews,
  addReviewToUiKit
} from '../Controllers/uiKit.controller.js';

const router = express.Router();
// http://localhost:8000/api/uikit/
// http://localhost:8000/api/uikit/
// http://localhost:8000/api/uikit/

// GET all UI Kits
router.get('/', getAllUiKits);

// GET all product categories (must come before /:id)
router.get('/categories', getAllCategories);

// GET UI Kits by search query (e.g., ?q=figma)
router.get('/search/query', searchUiKits);

// GET featured UI Kits
router.get('/featured/all', getFeaturedUiKits);

// GET reviews for a UI Kit
router.get('/:id/reviews', getUiKitReviews);

// POST a new review to a UI Kit
router.post('/:id/reviews', addReviewToUiKit);

// GET single UI Kit by ID (keep dynamic routes at the bottom)
router.get('/:id', getUiKitById);

// POST create new UI Kit
router.post('/', createUiKit);

// PUT update UI Kit by ID
router.put('/:id', updateUiKit);

// DELETE UI Kit by ID
router.delete('/:id', deleteUiKit);

// Optional future route
// router.get('/category/:category', getUiKitsByCategory);

export default router;