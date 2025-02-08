import React, { useEffect } from 'react';
import Header from './header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { selectUser } from './features/userSlice'; 
import { useSelector, useDispatch } from 'react-redux';
import Login from './Login';
import { auth } from './firebase';  
import { login, logout } from './features/userSlice'; // Import both login and logout actions
import Widgets from './Widgets';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Declare user only once

  useEffect(() => {
    // Listen for authentication state changes
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName || null, // Handle cases where displayName is undefined
            photoURL: userAuth.photoURL || null, // Handle cases where photoURL is undefined
          })
        );
      } else {
        // User is logged out
        dispatch(logout());
      }
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="app">
      <Header />
      {!user ? (
        <Login /> // Render Login component if no user is logged in
      ) : (
        <div className="app_body">
          <Sidebar />
          <Feed />
          <Widgets /> 
        </div>
      )}
    </div>
  );
}

export default App;