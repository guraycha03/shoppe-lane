// components/profile/profileBanner.jsx


import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Palette } from 'react-bootstrap-icons';
import { HexColorPicker } from 'react-colorful';

function ProfileBanner({ currentUser, setCurrentUser }) {
  const [bannerColor, setBannerColor] = useState(currentUser.bannerColor || '#f0f2f5');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [image, setImage] = useState(getValidProfileImage(currentUser.profileImage));

  const fileInputRef = useRef(null);
  const colorPickerRef = useRef(null); // For detecting outside clicks
  const DEFAULT_AVATAR = 'https://res.cloudinary.com/dyjd4nbrf/image/upload/v1753782519/default-avatar_c38cq7.png';

  function getValidProfileImage(image) {
    if (
      typeof image === 'string' &&
      image.trim() !== '' &&
      (image.startsWith('http') || image.startsWith('data:'))
    ) {
      return image;
    }
    return DEFAULT_AVATAR;
  }

  // Close color picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      const updatedUser = { ...currentUser, profileImage: base64Image };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setImage(base64Image);  // keep this, it updates local state in ProfileBanner
    
      // Notify others about the profile image update
      window.dispatchEvent(new CustomEvent('profileImageUpdated', { detail: base64Image }));
    
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map((user) =>
        user.username === currentUser.username || user.email === currentUser.email
          ? updatedUser
          : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
    

    if (file) reader.readAsDataURL(file);
  };

  const handleColorSave = () => {
    const updatedUser = { ...currentUser, bannerColor };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.username === currentUser.username || user.email === currentUser.email
        ? updatedUser
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);

    setShowColorPicker(false);
  };

 

  return (
    <div
      style={{
        backgroundColor: bannerColor,
        height: '180px',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
        position: 'relative',
      }}
      className="w-100"
    >
      {/* Palette Icon and Color Picker */}
      <div
        className="position-absolute"
        style={{ top: '10px', right: '10px', zIndex: 11 }}
        ref={colorPickerRef}
      >
        {!showColorPicker ? (
          <button
          onClick={() => setShowColorPicker(true)}
          title="Customize banner color"
          style={{
            width: '36px',
            height: '36px',
            border: 'none',
            backgroundColor: '#fff', // white background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)', // subtle shadow for separation
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const icon = e.currentTarget.querySelector('svg');
            if (icon) {
              icon.style.color = '#999';
              icon.style.filter = 'blur(0)';
              icon.style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            const icon = e.currentTarget.querySelector('svg');
            if (icon) {
              icon.style.color = '#bbb';
              icon.style.filter = 'blur(0.2px)';
              icon.style.opacity = '0.8';
            }
          }}
        >
          <Palette
            size={18}
            style={{
              color: '#bbb',
              opacity: 0.8,
              filter: 'blur(0.2px)',
              transition: 'all 0.3s ease',
            }}
          />
        </button>
        
        
        
        
        ) : (
          <div
            className="shadow bg-white p-3"
            style={{
              borderRadius: '12px',
              width: '200px',
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <label className="form-label mb-2 small text-muted">Choose banner color</label>
            <HexColorPicker
              color={bannerColor}
              onChange={setBannerColor}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '1rem',
              }}
            />
            <button
              onClick={handleColorSave}
              className="btn btn-sm w-100 text-dark"
              style={{
                background: 'linear-gradient(135deg, #B3CFD3, #CBDFE2)', // soft gradient
                border: '1px solid #BBD4D8',
                borderRadius: '6px',
                transition: 'background 0.3s ease, border 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #BBD4D8, #B3CFD3)';
                e.currentTarget.style.border = '1px solid #A6C4C8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #B3CFD3, #CBDFE2)';
                e.currentTarget.style.border = '1px solid #BBD4D8';
              }}
            >
              Done
            </button>


          </div>
        )}
      </div>

      {/* Profile Image */}
      <div className="position-absolute start-50 translate-middle" style={{ top: '100%' }}>
        <div className="position-relative">
          <img
            src={getValidProfileImage(image)}

            alt="Profile"
            className="rounded-circle shadow"
            style={{
              width: '130px',
              height: '130px',
              objectFit: 'cover',
              border: '4px solid white',
            }}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="btn btn-light rounded-circle p-2 position-absolute"
            style={{
              bottom: '0',
              right: '0',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
            title="Change profile picture"
          >
            <Pencil size={18} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
