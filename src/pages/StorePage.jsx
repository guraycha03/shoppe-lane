import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

import useFollowState from '../hooks/useFollowState';

import SellerInfoBox from '../components/SellerInfoBox';

import {
  getFollowState,
  setFollowState,
  getFollowersCount,
  setFollowersCount,

} from '../utils/followStorage';


function StorePage({
    isLoggedIn,
    currentUser,
    handleAddToCart,
    likedProducts,
    toggleLike,
    renderStars,
    addingToCartId,
    triggerFlyToCartAnimation,
    showNotification
  }) {

    const [hasFollowed, setHasFollowed] = useState(false);
    const [followers, setFollowers] = useState(0);

    // const isFollowing = getFollowState(currentUser, product.seller);
    const [isFollowing, setIsFollowing] = useState(false);

    
    
    const toggleFollow = () => {
      const newState = !isFollowing;
      setIsFollowing(newState);
      setFollowState(currentUser, sellerName, newState);
    };

  
  const { sellerId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slugify = (str) =>
    str?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  

  useEffect(() => {
    if (sellerData && currentUser) {
      const follow = getFollowState(currentUser, sellerData.name);
      setIsFollowing(follow);
    }
  }, [sellerData, currentUser]);


  useEffect(() => {
    if (!sellerData || !currentUser) return;
  
    const updateFollowState = () => {
      const followed = getFollowState(currentUser, sellerData.id);
      const count = getFollowersCount(sellerData.id);
      setHasFollowed(followed);
      setFollowers(count);
    };
  
    updateFollowState(); // initial
  
    const onStorageChange = (e) => {
      if (e.key === 'user_follow_map' || e.key === 'followers_count_map') {
        updateFollowState();
      }
    };
  
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [sellerData, currentUser]);
  

  

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then(res => {
        const sellerProducts = res.data.filter(
            p => slugify(p.seller) === sellerId
          );
          
        setProducts(sellerProducts);

        if (sellerProducts.length > 0) {
            setSellerData({
                name: sellerProducts[0].seller,
                followers: Math.floor(Math.random() * 5000),
                totalProducts: sellerProducts.length,
                id: slugify(sellerProducts[0].seller), 
              });              
        } else {
          setSellerData(null);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch seller products:', err);
        setError('Failed to load store. Please try again later.');
        setLoading(false);
      });
  }, [sellerId]);

  return (
    <div className="container py-4">
      {/* Back Button */}
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Seller Info */}
      {sellerData && (
        <div className="mb-4">
          <div
            className="clickable-seller-box p-3 rounded border mb-3"
            onClick={() => navigate(`/store/${slugify(sellerData.name)}`)}

            style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
            >
            <SellerInfoBox
                seller={sellerData}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
            />
            </div>

          <div className="text-muted mt-2">
            <i className="bi bi-box-seam me-1"></i>
            {sellerData.totalProducts} products listed
          </div>
        </div>
      )}

      <h2 className="mb-4">{sellerData?.name}'s Store</h2>

      {/* Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Product Grid */}
      <div className="row g-4">
        {!loading && !error && products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col-6 col-sm-4 col-md-3 col-lg-3">

                <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
                likedProducts={likedProducts}
                toggleLike={toggleLike}
                renderStars={renderStars}
                addingToCartId={addingToCartId}
                triggerFlyToCartAnimation={triggerFlyToCartAnimation}
                isLoggedIn={isLoggedIn}
                showNotification={showNotification}
                size="small"
                forceShowCartButton
                />


            </div>
          ))
          
          
          
        ) : !loading && !error ? (
          <p>No products found for this seller.</p>
        ) : null}
      </div>
    </div>
  );
}

export default StorePage;