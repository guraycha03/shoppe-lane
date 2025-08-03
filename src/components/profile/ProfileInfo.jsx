import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import ProfileBanner from './ProfileBanner';

function ProfileInfo({ currentUser, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(currentUser.username || '');
  const [editedEmail, setEditedEmail] = useState(currentUser.email || '');
  const [editedMobile, setEditedMobile] = useState(currentUser.mobile || '');

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      username: editedUsername,
      email: editedEmail,
      mobile: editedMobile,
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user =>
      user.username === currentUser.username || user.email === currentUser.email
        ? updatedUser
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <section className="card shadow-sm border-0 mb-4">
      <ProfileBanner currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <div className="pt-5 px-4 pb-4 mt-4">
        <h5 className="text-muted mb-3 mt-2 text-center">Personal Information</h5>

        {/* Username */}
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
            <div className="fs-5 text-secondary">{currentUser.username}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <strong className="d-block text-secondary small">Email</strong>
          {isEditing ? (
            <input
              type="email"
              className="form-control"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          ) : (
            <div className="fs-5 text-secondary">{currentUser.email}</div>
          )}
        </div>

        {/* Mobile Number with Country Dropdown */}
        <div className="mb-3">
          <strong className="d-block text-secondary small">Mobile Number</strong>
          {isEditing ? (
            <PhoneInput
              country={'ph'}
              value={editedMobile}
              onChange={setEditedMobile}
              inputClass="w-100"
              inputStyle={{
                width: '100%',
                borderRadius: '4px',
              }}
              containerStyle={{ width: '100%' }}
              dropdownStyle={{ maxHeight: '200px', overflowY: 'auto' }}
            />
          ) : (
            <div className="fs-5 text-secondary">
              {currentUser.mobile || '—'}
            </div>
          )}
        </div>

        {/* Action Buttons */}
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
        </div>
      </div>
    </section>
  );
}

export default ProfileInfo;
