// utils/api.js
// In a real app, these would be actual API calls
// For now, we're using mock data
import apiClient from '../api/axiosInstance';

// Enhanced mock product data with more meaningful details
const mockProducts = [
  {
    id: '1',
    name: 'Designify Pro UI Kit',
    description: 'A comprehensive UI kit with 250+ meticulously crafted components for web and mobile applications. Includes atomic design system, design tokens, and responsive layouts for all modern screen sizes.',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 124,
    category: 'ui-kits',
    featured: true,
    isNew: false,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2025-02-10',
    compatibleSoftware: ['Figma', 'Sketch', 'Adobe XD'],
    author: {
      id: 'auth1',
      name: 'DesignMaster Studios',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Award-winning design agency with 10+ years of experience creating premium UI resources',
      followers: 15423,
      memberSince: '2018-05-12'
    },
    images: [
      'https://picsum.photos/id/1/300/200',
      'https://picsum.photos/id/20/300/200',
      'https://picsum.photos/id/28/300/200',
      'https://picsum.photos/id/36/300/200'
    ],
    specifications: {
      'File Format': 'Figma, Sketch, Adobe XD',
      'Components': '250+',
      'Style Variants': 'Light, Dark, and Custom Themes',
      'Responsive': 'Yes - Mobile, Tablet, Desktop, and Large Screens',
      'Design System': 'Atomic Design with Design Tokens',
      'Documentation': 'Comprehensive PDF and Interactive Guide',
      'Support': '6 months of email support included',
      'Updates': 'Free updates for 12 months'
    },
    reviews: [
      {
        userName: 'JaneDoe',
        userAvatar: 'https://randomuser.me/api/portraits/women/21.jpg',
        rating: 5,
        date: '2025-02-15',
        content: 'Exceptional UI kit with outstanding documentation. All components are well-designed, properly organized in the library, and extremely easy to customize. The design system approach makes it perfect for large-scale projects.'
      },
      {
        userName: 'JohnSmith',
        userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4,
        date: '2025-02-10',
        content: 'Very comprehensive kit with excellent component organization. Would give 5 stars but a few of the more complex components could use more detailed documentation. The responsive behavior is exceptionally well thought out.'
      },
      {
        userName: 'DesignPro',
        userAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        rating: 5,
        date: '2025-01-28',
        content: 'This saved me at least 80 hours on my enterprise client project. The organization is perfect, the design is modern without being trendy, and the design tokens system made customizing to our brand a breeze.'
      }
    ],
    sku: 'DPUI-PRO-2025',
    inStock: true,
    soldCount: 5843,
    viewCount: 28932,
    features: [
      'Complete atomic design system with nested components',
      'Responsive designs for all device sizes',
      'Dark and light mode with custom theming options',
      'Monthly updates with new components',
      'Premium email support with 24-hour response time',
      'Interactive documentation with usage examples',
      'Accessibility compliant (WCAG 2.1 AA)',
      'Design tokens for easy customization'
    ],
    seller: {
      name: 'DesignMaster Studios',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      totalProducts: 24,
      rating: 4.9,
      location: 'San Francisco, CA',
      responseTime: '1-2 business days',
      salesCount: 15842,
      memberSince: '2018-05-12'
    },
    tags: ['UI Kit', 'Design System', 'Figma', 'Sketch', 'Adobe XD', 'Responsive', 'Dark Mode']
  },
  {
    id: '2',
    name: 'Iconic Pro Vector Pack',
    description: 'A comprehensive collection of 800+ pixel-perfect vector icons in multiple styles (outline, filled, duotone) and formats (SVG, PNG, EPS, Icon Font). Organized in categories with customizable stroke weights and colors.',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 87,
    category: 'icons',
    featured: false,
    isNew: true,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2025-01-15',
    compatibleSoftware: ['Adobe Illustrator', 'Figma', 'Sketch'],
    images: [
      'https://picsum.photos/id/45/300/200',
      'https://picsum.photos/id/48/300/200',
      'https://picsum.photos/id/49/300/200'
    ],
    author: {
      id: 'auth2',
      name: 'IconArtist',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Icon design specialist with focus on usability and visual consistency',
      followers: 8256,
      memberSince: '2020-03-18'
    },
    specifications: {
      'Icon Count': '800+',
      'Styles': 'Outline, Filled, Duotone',
      'Categories': '20 (Business, UI, Social, etc.)',
      'Formats': 'SVG, PNG, EPS, Icon Font',
      'Sizes': '16px, 24px, 32px, 48px, Customizable',
      'Customization': 'Editable stroke width and colors',
      'Updates': 'Quarterly with new icons'
    },
    sku: 'ICONIC-PRO-800',
    inStock: true,
    soldCount: 3254,
    viewCount: 14532,
    features: [
      'Pixel-perfect precision at all sizes',
      'Multiple export formats (SVG, PNG, EPS, Icon Font)',
      'Three consistent styles across all icons',
      'Regular updates with new icons',
      'Well-organized category system',
      'Custom color and stroke editor included',
      'Documentation for implementation in code'
    ],
    tags: ['Icons', 'Vector', 'SVG', 'UI Design', 'Graphics', 'Web Design']
  },
  {
    id: '3',
    name: 'Conversion Pro Landing Page Template',
    description: 'High-conversion, responsive website template specifically designed for SaaS and digital product landing pages. Includes 15 pre-built page layouts, performance optimization, and integration-ready components for popular marketing tools.',
    price: 29.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 56,
    category: 'web-templates',
    featured: true,
    isNew: false,
    onSale: false,
    licenseType: 'Commercial',
    lastUpdated: '2024-12-18',
    compatibleWith: ['HTML5', 'CSS3', 'JavaScript', 'React', 'WordPress'],
    images: [
      'https://picsum.photos/id/60/300/200',
      'https://picsum.photos/id/62/300/200',
      'https://picsum.photos/id/65/300/200'
    ],
    author: {
      id: 'auth3',
      name: 'WebCrafters Agency',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Conversion-focused web design studio specializing in high-performance templates',
      followers: 6823,
      memberSince: '2019-08-24'
    },
    specifications: {
      'Page Templates': '15 pre-built layouts',
      'Framework': 'React.js with NextJS',
      'Performance': '98+ Google Lighthouse Score',
      'Responsive': 'Fully responsive with custom breakpoints',
      'Integrations': 'Mailchimp, HubSpot, Google Analytics, Stripe',
      'Animations': 'GSAP animations with lazy loading',
      'Scripts': 'Optimized JavaScript with zero jQuery',
      'Accessibility': 'WCAG 2.1 AA compliant'
    },
    sku: 'CPLP-PRO-15',
    inStock: true,
    soldCount: 2135,
    viewCount: 9876,
    features: [
      'A/B testing ready components',
      'Conversion-optimized for digital products',
      'SEO-friendly structure and schema markup',
      'High-performance with 98+ Lighthouse score',
      'Integration-ready for popular marketing tools',
      'Mobile-first responsive design',
      'Detailed documentation with video tutorials',
      'Easy customization with CSS variables'
    ],
    tags: ['Landing Page', 'Website Template', 'React', 'NextJS', 'SaaS', 'Marketing']
  },
  {
    id: '4',
    name: 'Serif & Sans Typography Bundle',
    description: 'A comprehensive bundle of 28 premium fonts (12 serif, 12 sans-serif, 4 display) with multiple weights, alternates, and OpenType features. Perfect for branding, editorial design, and digital interfaces.',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviewCount: 43,
    category: 'fonts',
    featured: false,
    isNew: false,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2024-11-05',
    compatibleWith: ['Adobe Creative Suite', 'Office', 'Web Use', 'App Development'],
    images: [
      'https://picsum.photos/id/71/300/200',
      'https://picsum.photos/id/72/300/200',
      'https://picsum.photos/id/73/300/200'
    ],
    author: {
      id: 'auth4',
      name: 'FontMaker Foundry',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      bio: 'Independent type foundry creating modern, versatile typefaces since 2015',
      followers: 9432,
      memberSince: '2017-02-14'
    },
    specifications: {
      'Font Count': '28 fonts (12 serif, 12 sans-serif, 4 display)',
      'Weights': '6-10 weights per family (Light to Black)',
      'Features': 'Ligatures, alternates, small caps, fractions',
      'Language Support': '200+ Latin-based languages',
      'Format': 'OTF, TTF, WOFF, WOFF2',
      'Variable Fonts': 'Included for 8 font families',
      'Spacing': 'Professionally kerned character pairs',
      'Sample Files': 'Included (Sketch, Figma, PSD)'
    },
    sku: 'FONT-SS-BUNDLE-28',
    inStock: true,
    soldCount: 1872,
    viewCount: 7845,
    features: [
      'Comprehensive font families with multiple weights',
      'Extensive OpenType features and alternates',
      'Variable font versions for modern usage',
      'Web font formats included (WOFF, WOFF2)',
      'Extended language support for global projects',
      'Professionally kerned with manual adjustments',
      'Detailed PDF specimen and usage guide',
      'Integration examples for web and print projects'
    ],
    tags: ['Typography', 'Fonts', 'Serif', 'Sans-Serif', 'OpenType', 'Variable Fonts']
  },
  {
    id: '5',
    name: 'Organic Texture Collection',
    description: 'Set of 75 high-resolution (5000x5000px, 300DPI) organic background textures created from real-world materials. Includes paper, fabric, wood, stone, and metal textures with seamless tiling options.',
    price: 9.99,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 28,
    category: 'textures',
    featured: false,
    isNew: false,
    onSale: false,
    licenseType: 'Commercial',
    lastUpdated: '2024-10-12',
    compatibleWith: ['Photoshop', 'Illustrator', 'Procreate', 'Affinity'],
    images: [
      'https://picsum.photos/id/82/300/200',
      'https://picsum.photos/id/83/300/200',
      'https://picsum.photos/id/84/300/200'
    ],
    author: {
      id: 'auth5',
      name: 'TexturePro Studios',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      bio: 'Texture specialists creating high-quality materials from real-world sources',
      followers: 4213,
      memberSince: '2021-03-08'
    },
    specifications: {
      'Texture Count': '75 unique textures',
      'Categories': 'Paper, fabric, wood, stone, metal',
      'Resolution': '5000x5000 pixels at 300DPI',
      'Format': 'JPG, TIFF, PNG with alpha channels',
      'Tiling': 'Seamless options available for all textures',
      'Color Variants': 'Multiple color variations for each texture',
      'Normal Maps': 'Included for 3D application',
      'Preview Files': 'Low-res previews included for comps'
    },
    sku: 'TEXTURE-ORG-75',
    inStock: true,
    soldCount: 982,
    viewCount: 4321,
    features: [
      'Created from real materials using photogrammetry',
      'High-resolution (5000x5000px, 300DPI)',
      'Seamless tiling for infinite patterns',
      'Normal maps included for 3D applications',
      'Color variants with adjustment layers',
      'Organized PSD files with smart objects',
      'Low-res preview files for mockups',
      'Regular updates with new texture packs'
    ],
    tags: ['Textures', 'Backgrounds', 'Seamless', 'Organic', 'High-Resolution']
  },
  {
    id: '6',
    name: 'Pitch Perfect Presentation Template',
    description: 'Professional presentation template with 45 uniquely designed slide layouts optimized for pitch decks, business proposals, and company overviews. Includes data visualization slides, mockup showcases, and team presentation layouts.',
    price: 24.99,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 19,
    category: 'presentations',
    featured: false,
    isNew: true,
    onSale: false,
    licenseType: 'Commercial',
    lastUpdated: '2025-01-22',
    compatibleWith: ['PowerPoint', 'Keynote', 'Google Slides'],
    images: [
      'https://picsum.photos/id/91/300/200',
      'https://picsum.photos/id/92/300/200',
      'https://picsum.photos/id/93/300/200'
    ],
    author: {
      id: 'auth6',
      name: 'SlideMasters Inc.',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      bio: 'Presentation design experts with backgrounds in public speaking and visual storytelling',
      followers: 3451,
      memberSince: '2020-07-15'
    },
    specifications: {
      'Slide Count': '45 unique slide layouts',
      'Aspect Ratio': '16:9 widescreen (4:3 version included)',
      'Formats': 'PowerPoint, Keynote, Google Slides',
      'Data Visualization': '15+ chart and graph styles',
      'Animations': 'Custom subtle animations and transitions',
      'Image Placeholders': 'Smart objects for easy replacement',
      'Color Themes': '6 pre-designed color schemes',
      'Font Recommendations': 'Free font alternatives included'
    },
    sku: 'PPP-DECK-45',
    inStock: true,
    soldCount: 723,
    viewCount: 3214,
    features: [
      'Investor pitch deck optimized layouts',
      'Data visualization slides with editable charts',
      'Device mockup slides for product showcase',
      'Team and company culture presentation sections',
      'Minimal and clean design aesthetic',
      'Fully editable shapes and elements',
      'Print-ready with bleeds and guides',
      'Presentation structure guide included'
    ],
    tags: ['Presentations', 'Pitch Deck', 'PowerPoint', 'Keynote', 'Business', 'Slides']
  },
  {
    id: '7',
    name: 'Social Media Marketing Suite',
    description: 'Complete social media marketing template pack with 350+ editable templates optimized for all major platforms (Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube). Includes post templates, story templates, and advertisement layouts.',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviewCount: 32,
    category: 'social-media',
    featured: true,
    isNew: false,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2025-02-05',
    compatibleWith: ['Photoshop', 'Canva', 'Illustrator', 'InDesign'],
    images: [
      'https://picsum.photos/id/96/300/200',
      'https://picsum.photos/id/98/300/200',
      'https://picsum.photos/id/99/300/200'
    ],
    author: {
      id: 'auth7',
      name: 'SocialArtistry Pro',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      bio: 'Digital marketing specialists with 12+ years experience in social media content creation',
      followers: 12345,
      memberSince: '2018-11-23'
    },
    specifications: {
      'Template Count': '350+ editable templates',
      'Platforms': 'Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube',
      'Formats': 'Posts, Stories, Covers, Ads, Reels/TikTok',
      'File Types': 'PSD, AI, Canva Template Links',
      'Resolution': 'Optimized for each platform with @2x versions',
      'Sizes': 'All current platform dimensions (2025 updated)',
      'Organization': 'Folder structure by platform and purpose',
      'Guidelines': 'Platform-specific best practices included'
    },
    sku: 'SMMS-BUNDLE-350',
    inStock: true,
    soldCount: 4123,
    viewCount: 17234,
    features: [
      'Platform-optimized templates for all major networks',
      'Content calendars and posting schedules',
      'Engagement-focused post templates',
      'Advertisement layouts with CTA placements',
      'Seasonal and holiday themed templates',
      'Analytics report and dashboard templates',
      'Social media strategy guide included',
      'Monthly updates with new templates for trending formats'
    ],
    tags: ['Social Media', 'Instagram', 'Facebook', 'TikTok', 'Marketing', 'Templates']
  },
  {
    id: '8',
    name: 'Motion Graphics Essentials Pack',
    description: 'Comprehensive motion graphics toolkit with 120+ animated elements, transitions, titles, and effects for video editing and motion design. Compatible with major editing software and optimized for 4K resolution projects.',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: 21,
    category: 'motion-graphics',
    featured: false,
    isNew: true,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2025-01-28',
    compatibleWith: ['After Effects', 'Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve'],
    images: [
      'https://picsum.photos/id/103/300/200',
      'https://picsum.photos/id/104/300/200',
      'https://picsum.photos/id/106/300/200'
    ],
    author: {
      id: 'auth8',
      name: 'MotionMakers Studio',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      bio: 'Motion graphics specialists creating premium animation resources for filmmakers',
      followers: 7821,
      memberSince: '2019-06-11'
    },
    specifications: {
      'Elements Count': '120+ animated elements and templates',
      'Categories': 'Transitions, titles, lower thirds, backgrounds, effects',
      'Resolution': '3840x2160 (4K) with lossless alpha channels',
      'Compatibility': 'After Effects, Premiere Pro, Final Cut Pro, DaVinci Resolve',
      'Duration': 'Customizable length with easy looping',
      'Render Time': 'Optimized for fast rendering',
      'Audio': 'SFX included for all animations',
      'Customization': 'Fully editable with controls panel'
    },
    sku: 'MG-ESSENTIALS-120',
    inStock: true,
    soldCount: 1532,
    viewCount: 5893,
    features: [
      'Professionally designed motion graphics elements',
      '4K resolution with alpha channels for transparency',
      'Easy customization with control panels',
      'Sound effects included for all animations',
      'Organized project files with clear documentation',
      'Template previews for quick selection',
      'Regular updates with new animation styles',
      'Render optimization for efficiency'
    ],
    tags: ['Motion Graphics', 'After Effects', 'Video Editing', 'Animations', 'Transitions', '4K']
  },
  {
    id: '9',
    name: 'Handcrafted Illustration Collection',
    description: 'A curated set of 45 hand-drawn vector illustrations in a cohesive artistic style. Perfect for websites, apps, print materials, and branding projects. Includes scenes, characters, objects, and decorative elements.',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviewCount: 47,
    category: 'illustrations',
    featured: true,
    isNew: false,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2024-12-07',
    compatibleWith: ['Illustrator', 'Photoshop', 'Sketch', 'Figma'],
    images: [
      'https://picsum.photos/id/110/300/200',
      'https://picsum.photos/id/111/300/200',
      'https://picsum.photos/id/112/300/200'
    ],
    author: {
      id: 'auth9',
      name: 'ArtistryLab Collective',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      bio: 'Illustration studio specializing in cohesive visual storytelling for brands',
      followers: 8752,
      memberSince: '2020-02-19'
    },
    specifications: {
      'Illustration Count': '45 unique illustrations',
      'Style': 'Hand-drawn with digital color treatment',
      'Categories': 'Scenes, characters, objects, decorative elements',
      'Format': 'Vector (AI, EPS) and raster (PSD, PNG)',
      'Customization': 'Layered files with editable colors',
      'Resolution': 'Vector scalable + 4000x4000px @ 300DPI',
      'Color Variants': 'Light and dark versions included',
      'Usage Examples': 'Implementation examples included'
    },
    sku: 'ILLUS-HAND-45',
    inStock: true,
    soldCount: 2654,
    viewCount: 10342,
    features: [
      'Cohesive artistic style across all illustrations',
      'Vector format for unlimited scaling',
      'Layered files with organized structure',
      'Custom color variations included',
      'Scene building elements for custom compositions',
      'Regular updates with new illustration sets',
      'Character creation toolkit with poses',
      'Web and print optimization included'
    ],
    tags: ['Illustrations', 'Hand-drawn', 'Vector', 'Characters', 'Scenes', 'Branding']
  },
  {
    id: '10',
    name: 'ShopCore E-commerce UI Kit',
    description: 'Complete UI kit specifically designed for online stores with 350+ e-commerce specific components. Includes product listings, cart functions, checkout flows, user account areas, and admin dashboard templates.',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 72,
    category: 'ui-kits',
    featured: true,
    isNew: true,
    onSale: true,
    licenseType: 'Commercial',
    lastUpdated: '2025-02-20',
    compatibleSoftware: ['Figma', 'Sketch', 'Adobe XD'],
    images: [
      'https://picsum.photos/id/119/300/200',
      'https://picsum.photos/id/122/300/200',
      'https://picsum.photos/id/125/300/200'
    ],
    author: {
      id: 'auth10',
      name: 'ShopDesigns Agency',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      bio: 'E-commerce UI/UX specialists with expertise in conversion optimization',
      followers: 11532,
      memberSince: '2019-01-08'
    },
    specifications: {
      'Components': '350+ e-commerce specific components',
      'Screens': '80+ pre-designed screen templates',
      'Design System': 'Complete e-commerce design system',
      'Patterns': 'Common e-commerce UI patterns library',
      'Responsive': 'Mobile, tablet, and desktop versions',
      'Themes': 'Light, dark, and custom theme support',
      'Documentation': 'Extensive usage guidelines and patterns',
      'Code Snippets': 'HTML/CSS/React implementation examples'
    },
    sku: 'SHOP-CORE-350',
    inStock: true,
    soldCount: 3215,
    viewCount: 15321,
    features: [
      'Conversion-optimized product listing layouts',
      'Complete checkout flow with form validation',
      'User account and dashboard components',
      'Shopping cart and wishlist functionality',
      'Search results and filtering systems',
      'Product detail page variations',
      'Mobile-first responsive components',
      'Admin dashboard interface components'
    ],
    tags: ['E-commerce', 'UI Kit', 'Figma', 'Sketch', 'Web Design', 'Online Store']
  }
];


// Mock categories data
const mockCategories = [
  { id: '1', name: 'ui-kits' },
  { id: '2', name: 'icons' },
  { id: '3', name: 'fonts' },
  { id: '4', name: 'textures' },
  { id: '5', name: 'presentations' },
  { id: '6', name: 'social-media' },
  { id: '7', name: 'motion-graphics' },
  { id: '8', name: 'illustrations' },
];

// Simulate API calls with a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Fetch all products
// export const fetchProducts = async () => {
//   await delay(500); // Simulate network delay
//   return [...mockProducts];
// };


// Fetch a single product by ID
// export const fetchProductById = async (id) => {
//   await delay(300);
//   const product = mockProducts.find(p => p.id === id);
//   if (!product) {
//     throw new Error('Product not found');
//   }
//   return { ...product };
// };

// // Fetch all categories
// export const fetchCategories = async () => {
//   await delay(300);
//   return [...mockCategories];
// };

// // Fetch products by category
// export const fetchProductsByCategory = async (categoryId) => {
//   await delay(400);
//   const filteredProducts = mockProducts.filter(p => p.categoryId === categoryId);
//   return [...filteredProducts];
// };

// // Fetch featured products
// export const fetchFeaturedProducts = async () => {
//   await delay(300);
//   const featuredProducts = mockProducts.filter(p => p.featured);
//   return [...featuredProducts];
// };

// // Fetch new products
// export const fetchNewProducts = async () => {
//   await delay(300);
//   const newProducts = mockProducts.filter(p => p.isNew);
//   return [...newProducts];
// };

// // Fetch on sale products
// export const fetchSaleProducts = async () => {
//   await delay(300);
//   const saleProducts = mockProducts.filter(p => p.onSale);
//   return [...saleProducts];
// };

// // Search products
// export const searchProducts = async (query) => {
//   await delay(600);
//   const searchQuery = query.toLowerCase();
//   const searchResults = mockProducts.filter(p => 
//     p.name.toLowerCase().includes(searchQuery) || 
//     p.description.toLowerCase().includes(searchQuery) ||
//     (p.author && p.author.name.toLowerCase().includes(searchQuery))
//   );
//   return [...searchResults];
// };

// Fetch all products

export const fetchProducts = async () => {
  try {
    await delay(500);
    const response = await apiClient.get('/uikit');
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error?.response?.data || error.message);
    throw new Error('Could not fetch products.');
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    await delay(300);
    const response = await apiClient.get(`/uikit/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error?.response?.data || error.message);
    throw new Error('Product not found.');
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    await delay(300);
    const response = await apiClient.get('/uikit/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error?.response?.data || error.message);
    throw new Error('Failed to load categories.');
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryId) => {
  try {
    await delay(400);
    const response = await apiClient.get(`/uikit/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error?.response?.data || error.message);
    throw new Error('Failed to fetch products by category.');
  }
};

// Fetch featured products
export const fetchFeaturedProducts = async () => {
  try {
    await delay(300);
    const response = await apiClient.get('/uikit/featured/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured products:', error?.response?.data || error.message);
    throw new Error('Failed to load featured products.');
  }
};

// Fetch new products
export const fetchNewProducts = async () => {
  try {
    await delay(300);
    const response = await apiClient.get('/uikit/new');
    return response.data;
  } catch (error) {
    console.error('Error fetching new products:', error?.response?.data || error.message);
    throw new Error('Failed to load new products.');
  }
};

// Fetch on-sale products
export const fetchSaleProducts = async () => {
  try {
    await delay(300);
    const response = await apiClient.get('/uikit/sale');
    return response.data;
  } catch (error) {
    console.error('Error fetching sale products:', error?.response?.data || error.message);
    throw new Error('Failed to load sale products.');
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    await delay(600);
    const response = await apiClient.get(`/uikit/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching products for query "${query}":`, error?.response?.data || error.message);
    throw new Error('Search failed. Please try again.');
  }
};