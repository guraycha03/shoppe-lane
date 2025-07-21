import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


import { Pencil } from 'react-bootstrap-icons';

function Profile({ user }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [image, setImage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        navigate('/login');
        window.location.reload(); 
      };
      
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const stored = localStorage.getItem('currentUser');

    // If not logged in, redirect to login
    if (!isLoggedIn || !stored) {
      navigate('/login');
      return;
    }

    try {
      const storedUser = JSON.parse(stored);
      if (storedUser && typeof storedUser === 'object') {
        setCurrentUser(storedUser);
        setImage(storedUser.profileImage || '');
        setEditedUsername(storedUser.username || '');
        setEditedEmail(storedUser.email || '');
      }
    } catch (err) {
      console.error("Failed to load user:", err);
      navigate('/login'); // fallback to login on error
    }
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImage(base64Image);
  
      const updatedUser = { ...currentUser, profileImage: base64Image };

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

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
  

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      username: editedUsername,
      email: editedEmail,
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.username === currentUser.username || user.email === currentUser.email
        ? updatedUser
        : user
    );
  
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    setCurrentUser(updatedUser);
    setIsEditing(false);
  };
  

  if (!currentUser) return <p className="text-center my-5">Loading profile...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">My Account</h2>
      <div className="card p-4 shadow-sm border-0">
        {/* Profile Picture */}
        <div className="d-flex flex-column align-items-center mb-4">
          <div className="position-relative">
            <img
              src={image || '/images/default-avatar.png'}
              alt="Profile"
              className="rounded-circle shadow"
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'cover',
                border: '4px solid #dee2e6',
              }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="btn btn-light rounded-circle p-2 position-absolute"
              style={{
                bottom: 0,
                right: 0,
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

        {/* Info Section */}
        <div className="mb-3">
          <h5 className="text-muted">Account Details</h5>
          <hr />
          <div className="mb-3">
            <strong className="d-block text-secondary small">Username</strong>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            ) : (
              <div className="fs-5">{currentUser.username}</div>
            )}
          </div>
          <div>
            <strong className="d-block text-secondary small">Email</strong>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              <div className="fs-5">{currentUser.email}</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
                {isEditing ? (
                <>
                    <button className="btn btn-success" onClick={handleSave}>
                    Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    Cancel
                    </button>
                </>
                ) : (
                <button className="btn btn-outline-primary" onClick={handleEditToggle}>
                    Edit Info
                </button>
                )}
            </div>
            <button className="btn btn-outline-danger" onClick={handleLogout}> Log Out </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
