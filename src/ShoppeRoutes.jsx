// src/ShoppeRoutes.jsx


import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Footer from './components/Footer';
import ProductResultsPage from './components/ProductResultsPage';
import AllReviewsPage from './pages/AllReviewsPage';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StorePage from './pages/StorePage';




function PageWrapper({ children }) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

function ShoppeRoutes({ isLoggedIn, setIsLoggedIn, showNotification, ...props }) {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route
          path="/"
          element={
            <PageWrapper>
              <Home
                {...props}
                triggerFlyToCartAnimation={props.triggerFlyToCartAnimation}
                isLoggedIn={isLoggedIn} 
                showNotification={showNotification} 
              />
            </PageWrapper>
          }
        />

        <Route
          path="/product/:id"
          element={
            <PageWrapper>
              <ProductPage
                {...props}
                triggerFlyToCartAnimation={props.triggerFlyToCartAnimation}
                isLoggedIn={isLoggedIn}
              />
            </PageWrapper>
          }
        />

        <Route
          path="/cart"
          element={
            <PageWrapper>
              <Cart
                cartItems={props.cartItems}
                updateCartQuantity={props.updateCartQuantity}
                removeFromCart={props.removeFromCart}
              />
            </PageWrapper>
          }
        />

        <Route
          path="/search"
          element={
            <PageWrapper>
              <ProductResultsPage
                {...props}
                triggerFlyToCartAnimation={props.triggerFlyToCartAnimation}
                isLoggedIn={isLoggedIn}                     
                showNotification={showNotification} 
              />
            </PageWrapper>
          }
        />

        <Route
          path="/category/:name"
          element={
            <PageWrapper>
              <ProductResultsPage
                {...props}
                triggerFlyToCartAnimation={props.triggerFlyToCartAnimation}
                isLoggedIn={isLoggedIn}    
                showNotification={showNotification}                  
              />
            </PageWrapper>
          }
        />

        <Route
          path="/reviews/:id"
          element={
            <PageWrapper>
              <AllReviewsPage
                isLoggedIn={isLoggedIn}
                showNotification={showNotification}
              />
            </PageWrapper>
          }
        />


        <Route
          path="/account"
          element={
            <PageWrapper>
              {props.isLoggedIn ? (
                <Profile user={props.user} />
              ) : (
                <Navigate to="/login" />
              )}
            </PageWrapper>
          }
        />


        <Route
          path="/login"
          element={
            <PageWrapper>
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            </PageWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <PageWrapper>
              <SignUpPage setIsLoggedIn={setIsLoggedIn} />
            </PageWrapper>
          }
        />

        <Route
          path="/store/:sellerId"
          element={
            <PageWrapper>
              <StorePage
                isLoggedIn={isLoggedIn}
                currentUser={props.user?.username}
                handleAddToCart={props.handleAddToCart} 
                likedProducts={props.likedProducts}     
                toggleLike={props.toggleLike}           
                renderStars={props.renderStars}         
                addingToCartId={props.addingToCartId}   
                triggerFlyToCartAnimation={props.triggerFlyToCartAnimation} 
                showNotification={props.showNotification} 
              />
            </PageWrapper>
          }
        />




        <Route path="/profile" element={<Profile />} />

      </Routes>
    </AnimatePresence>
  );
}

export default ShoppeRoutes;
