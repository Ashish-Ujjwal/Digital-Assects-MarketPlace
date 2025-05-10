import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaShoppingCart,
  FaStore,
  FaHeart,
  FaDownload,
  FaEdit,
  FaSignOutAlt,
  FaCreditCard,
  FaBell,
  FaCog,
  FaHistory,
  FaStar
} from 'react-icons/fa';
import { fetchProducts } from '../utils/api';
import '../assets/styles/pages/_account.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Account = () => {

  // Mock user data - In a real app, this would come from auth context or API
  // const [user, setUser] = useState({
  //   id: 'user123',
  //   name: 'Alex Johnson',
  //   email: 'alex.johnson@example.com',
  //   avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  //   memberSince: '2023-05-15',
  //   location: 'San Francisco, CA',
  //   bio: 'UI/UX designer specializing in design systems and interactive prototypes.',
  //   website: 'alexjohnson.design',
  //   totalSales: 157,
  //   totalEarnings: 12680.50,
  //   followers: 432,
  //   following: 98
  // });

  const { logout, currentUser, updateProfile} = useAuth();
  
  const navigate = useNavigate();
  // Tabs state
  const [activeTab, setActiveTab] = useState('purchases');

  const [user, setUser] = useState(null);
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Update Profile ....
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    location: currentUser.location || '',
    bio: currentUser.bio || '',
    website: currentUser.website || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile.');
    }
  };


  // Products state
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's products
  useEffect(() => {
    const loadUserProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();

        // Mock filtering for purchased, sold, and favorited products
        // In a real app, these would be separate API calls
        setPurchasedItems(products.slice(0, 3).map(product => ({
          ...product,
          purchaseDate: '2025-02-15',
          licenseKey: 'XXX-XXXX-XXXX-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          downloads: 3
        })));

        setSoldItems(products.slice(3, 6).map(product => ({
          ...product,
          soldDate: '2025-01-22',
          buyer: {
            name: 'Corporate Designs Inc.',
            avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
          },
          earnings: product.price * 0.8
        })));

        setFavorites(products.slice(1, 4));
      } catch (error) {
        console.error("Failed to load user products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProducts();
  }, []);

  // Transactions history (mock data)
  const transactions = [
    { id: 'trans1', date: '2025-03-01', type: 'sale', amount: 49.99, product: 'Designify Pro UI Kit', status: 'completed' },
    { id: 'trans2', date: '2025-02-20', type: 'purchase', amount: -29.99, product: 'Icon Master Pack', status: 'completed' },
    { id: 'trans3', date: '2025-02-15', type: 'withdrawal', amount: -250.00, product: null, status: 'completed' },
    { id: 'trans4', date: '2025-02-10', type: 'sale', amount: 39.99, product: 'Admin Dashboard Template', status: 'completed' }
  ];

  return (
    <div className="ua-account-page">
      <div className="ua-account-container">
        {/* Profile Section */}
        <div className="ua-profile-section">
          <div className="ua-profile-header">
            <div className="ua-profile-avatar">
              <img src={user?.avatarUrl} alt={user?.name} />
            </div>
            <div className="ua-profile-details">
              <h1>{user?.name}</h1>
              <div className="ua-profile-meta">
                <div className="ua-meta-item">
                  <FaEnvelope />
                  <span>{user?.email}</span>
                </div>
                <div className="ua-meta-item">
                  <FaCalendarAlt />
                  <span>Member since {new Date(user?.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="ua-meta-item">
                  <FaUser />
                  <span>{user?.location}</span>
                </div>
              </div>
              <p className="ua-profile-bio">{user?.bio}</p>
            </div>
            <div className="ua-profile-actions">
              <button className="ua-edit-profile-btn">
                <FaEdit /> Edit Profile
              </button>
              <button className="ua-logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          <div className="ua-profile-stats">
            <div className="ua-stat-card">
              <div className="ua-stat-value">${user?.totalEarnings?.toLocaleString?.() || '0'}</div>
              <div className="ua-stat-label">Total Earnings</div>
            </div>
            <div className="ua-stat-card">
              <div className="ua-stat-value">{user?.totalSales ?? 0}</div>
              <div className="ua-stat-label">Items Sold</div>
            </div>
            <div className="ua-stat-card">
              <div className="ua-stat-value">{user?.followers ?? 0}</div>
              <div className="ua-stat-label">Followers</div>
            </div>
            <div className="ua-stat-card">
              <div className="ua-stat-value">{purchasedItems?.length ?? 0}</div>
              <div className="ua-stat-label">Items Purchased</div>
            </div>
          </div>
        </div>

        {/* Main Account Content */}
        <div className="ua-account-content">
          {/* Tabs */}
          <div className="ua-account-tabs">
            <button
              className={`tab-btn ${activeTab === 'purchases' ? 'active' : ''}`}
              onClick={() => setActiveTab('purchases')}
            >
              <FaShoppingCart /> Purchases
            </button>
            <button
              className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`}
              onClick={() => setActiveTab('sales')}
            >
              <FaStore /> Sales
            </button>
            <button
              className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <FaHeart /> Favorites
            </button>
            <button
              className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactions')}
            >
              <FaHistory /> Transactions
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FaCog /> Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="ua-tab-content">
            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="ua-purchases-content">
                <h2>My Purchases</h2>
                {loading ? (
                  <div className="ua-loading">Loading purchases...</div>
                ) : purchasedItems.length > 0 ? (
                  <div className="ua-purchased-items">
                    {purchasedItems.map(item => (
                      <div className="ua-product-card" key={item.id}>
                        <div className="ua-product-image">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="ua-product-info">
                          <h3>{item.name}</h3>
                          <div className="ua-purchase-meta">
                            <span className="ua-purchase-date">
                              <FaCalendarAlt /> Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
                            </span>
                            <span className="ua-license-type">
                              <FaCreditCard /> {item.licenseType} License
                            </span>
                          </div>
                          <div className="ua-license-key">
                            <small>License key: {item.licenseKey}</small>
                          </div>
                          <div className="ua-product-actions">
                            <button className="ua-download-btn">
                              <FaDownload /> Download ({item.downloads}/5)
                            </button>
                            <button className="ua-support-btn">
                              Contact Support
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ua-empty-state">
                    <FaShoppingCart size={50} />
                    <h3>No purchases yet</h3>
                    <p>Items you purchase will appear here</p>
                    <button className="ua-browse-btn">Browse Marketplace</button>
                  </div>
                )}
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === 'sales' && (
              <div className="ua-sales-content">
                <h2>My Sales</h2>
                {loading ? (
                  <div className="ua-loading">Loading sales...</div>
                ) : soldItems.length > 0 ? (
                  <div className="ua-sold-items">
                    {soldItems.map(item => (
                      <div className="ua-product-card" key={item.id}>
                        <div className="ua-product-image">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="ua-product-info">
                          <h3>{item.name}</h3>
                          <div className="ua-sale-meta">
                            <span className="ua-sale-date">
                              <FaCalendarAlt /> Sold on {new Date(item.soldDate).toLocaleDateString()}
                            </span>
                            <span className="ua-sale-earnings">
                              <FaCreditCard /> Earned ${item.earnings.toFixed(2)}
                            </span>
                          </div>
                          <div className="ua-buyer-info">
                            <img src={item.buyer.avatar} alt={item.buyer.name} />
                            <span>Purchased by {item.buyer.name}</span>
                          </div>
                          <div className="ua-product-actions">
                            <button className="ua-details-btn">
                              View Details
                            </button>
                            <button className="ua-contact-buyer-btn">
                              Contact Buyer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ua-empty-state">
                    <FaStore size={50} />
                    <h3>No sales yet</h3>
                    <p>Start selling your templates to see them here</p>
                    <button className="ua-upload-btn">Upload New Item</button>
                  </div>
                )}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="ua-favorites-content">
                <h2>My Favorites</h2>
                {loading ? (
                  <div className="ua-loading">Loading favorites...</div>
                ) : favorites.length > 0 ? (
                  <div className="ua-favorite-items">
                    {favorites.map(item => (
                      <div className="ua-product-card" key={item.id}>
                        <div className="ua-product-image">
                          <img src={item.images[0]} alt={item.name} />
                        </div>
                        <div className="ua-product-info">
                          <h3>{item.name}</h3>
                          <div className="ua-product-meta">
                            <span className="ua-product-price">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="ua-product-rating">
                              <FaStar /> {item.rating.toFixed(1)} ({item.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="ua-product-author">
                            <img src={item.author.avatar} alt={item.author.name} />
                            <span>by {item.author.name}</span>
                          </div>
                          <div className="ua-product-actions">
                            <button className="ua-view-btn">
                              View Details
                            </button>
                            <button className="ua-remove-favorite-btn">
                              Remove from Favorites
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ua-empty-state">
                    <FaHeart size={50} />
                    <h3>No favorites yet</h3>
                    <p>Items you favorite will appear here</p>
                    <button className="ua-browse-btn">Browse Marketplace</button>
                  </div>
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="ua-transactions-content">
                <h2>Transaction History</h2>
                <div className="ua-transactions-table-container">
                  <table className="ua-transactions-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(transaction => (
                        <tr key={transaction.id}>
                          <td>{new Date(transaction.date).toLocaleDateString()}</td>
                          <td>
                            {transaction.type === 'sale' && (
                              <span className="ua-transaction-sale">Sale: {transaction.product}</span>
                            )}
                            {transaction.type === 'purchase' && (
                              <span className="ua-transaction-purchase">Purchase: {transaction.product}</span>
                            )}
                            {transaction.type === 'withdrawal' && (
                              <span className="ua-transaction-withdrawal">Withdrawal to Bank Account</span>
                            )}
                          </td>
                          <td className={transaction.amount > 0 ? 'amount-positive' : 'amount-negative'}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} USD
                          </td>
                          <td>
                            <span className={`status-badge ${transaction.status}`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ua-transactions-pagination">
                  <button disabled>Previous</button>
                  <span>Page 1 of 1</span>
                  <button disabled>Next</button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="ua-settings-content">
                <h2>Account Settings</h2>

                <div className="ua-settings-section">
                  <h3>Profile Information</h3>

                  <div className="ua-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="ua-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      readOnly
                      style={{ background: 'transparent', color: '#333' }}
                    />
                  </div>

                  <div className="ua-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="ua-form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      rows={4}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="ua-form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="ua-save-btn" onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>

                <div className="ua-settings-section">
                  <h3>Payment Methods</h3>
                  <div className="ua-payment-methods">
                    <div className="ua-payment-method-card">
                      <div className="ua-card-icon">
                        <FaCreditCard size={24} />
                      </div>
                      <div className="ua-card-details">
                        <h4>Visa ending in 4242</h4>
                        <p>Expires 05/26</p>
                      </div>
                      <div className="ua-card-actions">
                        <button className="ua-default-btn">Default</button>
                        <button className="ua-remove-btn">Remove</button>
                      </div>
                    </div>
                    <button className="ua-add-payment-btn">+ Add Payment Method</button>
                  </div>
                </div>

                <div className="ua-settings-section">
                  <h3>Notifications</h3>
                  <div className="ua-notification-settings">
                    <div className="ua-notification-option">
                      <div>
                        <h4>Sales Notifications</h4>
                        <p>Get notified when someone purchases your item</p>
                      </div>
                      <label className="ua-toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="ua-toggle-slider"></span>
                      </label>
                    </div>
                    <div className="ua-notification-option">
                      <div>
                        <h4>Comment Notifications</h4>
                        <p>Get notified when someone comments on your item</p>
                      </div>
                      <label className="ua-toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="ua-toggle-slider"></span>
                      </label>
                    </div>
                    <div className="ua-notification-option">
                      <div>
                        <h4>Update Notifications</h4>
                        <p>Get notified about new features and updates</p>
                      </div>
                      <label className="ua-toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="ua-toggle-slider"></span>
                      </label>
                    </div>
                    <div className="ua-notification-option">
                      <div>
                        <h4>Marketing Emails</h4>
                        <p>Receive emails about promotions and special offers</p>
                      </div>
                      <label className="ua-toggle-switch">
                        <input type="checkbox" />
                        <span className="ua-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="ua-settings-section danger-zone">
                  <h3>Account Actions</h3>
                  <button className="ua-change-password-btn">Change Password</button>
                  <button className="ua-delete-account-btn">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;