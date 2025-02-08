import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import './Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth'; // Import updateProfile

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };


  const LoginToApp = (e) => {
    e.preventDefault();
  
    signInWithEmailAndPassword(auth, email, password) // Use the modular function
      .then((userCredential) => {
        const user = userCredential.user;
  
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.message); // Show the error message
      });
  };

  const register = () => {
    if (!name) {
      alert('Please enter a full name!');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Use the standalone updateProfile function
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profilePic || null,
        })
          .then(() => {
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: name,
                photoURL: profilePic || null,
              })
            );
            alert('Registration successful!');
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user:', error.code, error.message);
        alert(`Registration failed: ${error.message}`);
      });
  };

  return (
    <div className="login">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png" 
        alt="LinkedIn Logo" 
        width="50" 
        height="50"
      />
      <form>
        <input 
          placeholder="Full name (required if registering)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          type="text"
        />
        <input 
          placeholder="Profile pic URL (optional)" 
          value={profilePic} 
          onChange={(e) => setProfilePic(e.target.value)} 
          type="text"
        />
        <input 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email"
        />
        <input 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password"
        />
        <button type="submit" onClick={LoginToApp}>Sign In</button>
      </form>
      <p>Not a member?{" "}
        <span className="login_register" onClick={register}>Register Now</span>
      </p>
    </div>
  );
}

export default Login;