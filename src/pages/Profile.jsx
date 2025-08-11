import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import ProfileInfo from '../components/profile/ProfileInfo';
import LocationPicker from '../components/profile/LocationPicker';
// import { getFollowedSellerIdsForUser } from '../utils/followStorage';
import StoresModal from '../components/profile/StoresModal'; // adjust the path



import axios from 'axios';

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState(null);
  const [followedStores, setFollowedStores] = useState([]);
  const [showStoresModal, setShowStoresModal] = useState(false);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const stored = localStorage.getItem('currentUser');

    if (!isLoggedIn || !stored) {
      navigate('/login');
      return;
    }

    try {
      const storedUser = JSON.parse(stored);
      setCurrentUser(storedUser);
      const savedAddress = localStorage.getItem(`address-${storedUser.username}`);
      if (savedAddress) {
        setAddress(savedAddress);
      }

      setImage(storedUser.profileImage || '');
      setEditedUsername(storedUser.username || '');
      setEditedEmail(storedUser.email || '');
    } catch (err) {
      console.error("Failed to load user:", err);
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchFollowedStores = async () => {
      const sellerIds = getFollowedSellerIdsForUser(currentUser.username);
      console.log("🛒 Followed Seller IDs:", sellerIds); // <-- LOG HERE
    
      if (!sellerIds.length) {
        setFollowedStores([]);
        return;
      }
    
      try {
        const { data } = await axios.get('https://687c9936918b6422432ebfe8.mockapi.io/api/products');

        console.log("📦 Products Fetched:", data.length);
    
        const uniqueStores = sellerIds.map(sellerId => {
          const product = data.find(p => String(p.sellerId) === String(sellerId));
          return product
            ? {
                sellerId: product.sellerId,
                seller: product.seller,
                sellerImage: product.sellerImage || product.image || '', // Fallback
              }
            : null;
        }).filter(Boolean);
        
        
    
        setFollowedStores(uniqueStores);
      } catch (error) {
        console.error('Failed to fetch followed stores:', error);
      }
    };
    

    fetchFollowedStores();
  }, [currentUser]);

  useEffect(() => {
    if (showStoresModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [showStoresModal]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setShowStoresModal(false);
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);
  
  

  if (!currentUser) return <p className="text-center my-5">Loading profile...</p>;

  return (
    <div className="container pt-2 pb-4">
      <div className="mb-2">
        <BackButton />
      </div>

      <h2 className="text-center text-muted">My Account</h2>

      {/* Personal Info Section */}
      <ProfileInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />


      {/* Buttons */}
      <div className="row g-3 mt-4 mb-4">
        <div className="col-12 col-sm-6 col-md-4">
          <button
            className="btn btn-light w-100 border shadow-sm px-4 py-2 fs-6 d-flex align-items-center justify-content-center gap-2 fw-semibold custom-hover"
            onClick={() => setShowStoresModal(true)}
          >
            <i className="bi bi-shop text-secondary fs-5"></i>
            <span className="text-secondary">Stores You Follow</span>
          </button>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <button
            className="btn btn-outline-secondary w-100 border shadow-sm px-4 py-2 fs-6 d-flex align-items-center justify-content-center gap-2 fw-semibold custom-hover"
            onClick={() => alert('Start Selling functionality coming soon!')}
          >
            <i className="bi bi-bag-plus text-secondary fs-5"></i> 
            <span className="text-secondary">Start Selling</span>
          </button>
        </div>

        <div className="col-12 col-md-4">
          <button
            className="btn w-100 border shadow-sm px-4 py-2 fs-6 d-flex align-items-center justify-content-center gap-2 fw-semibold logout-hover"
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('currentUser');
              localStorage.removeItem('followedUsers'); // 🔥 clear follow state
              window.location.href = '/login';
            }}
            
            
          >
            <i className="bi bi-box-arrow-right fs-5 text-danger"></i>
            <span className="text-danger">Logout</span>
          </button>
        </div>
      </div>




      {/* SECTION 2: Order History (placeholder) */}
      <section className="card p-4 shadow-sm border-0 mb-4">
        <h5 className="text-muted mb-3">Order History</h5>
        <p className="text-muted">No orders yet.</p>
      </section>

      {/* Address Field Section */}
      <section className="card p-4 shadow-sm border-0 mb-4">
        <h5 className="text-muted mb-3">Delivery Address</h5>

        <LocationPicker
          setAddress={(addr) => {
            setAddress(addr);
            localStorage.setItem(`address-${currentUser.username}`, addr);
          }}
          setPosition={setPosition}
        />

        {address && (
          <div className="alert alert-light border mt-3">
            <strong>Selected Address:</strong>
            <br />
            {address}
          </div>
        )}
      </section>

      {/* Followed Sotres Modal */}
      {showStoresModal && (
        <StoresModal
          onClose={() => setShowStoresModal(false)}
          followedStores={followedStores}
        />
      )}
    </div>
    
  );
}

export default Profile;
