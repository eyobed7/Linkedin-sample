import React from 'react'
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css'
import HeaderOption from './HeaderOption';
import { logout } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { selectUser } from './features/userSlice';

function Header() {
  const user=useSelector(selectUser);
 const dispatch = useDispatch();

  const logoutOfApp =()=>{
    dispatch(logout());
    auth.signOut();
  }
  return (
    <div className="header">
      {/* Left Section */}
      <div className="header_left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          alt="LinkedIn Logo"
        />
        <div className="header_search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      {/* Right Section */}
      <div className="header_right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={WorkIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />

        {/* User Avatar */}
        <HeaderOption
          avatar="https://compassionate-leakey-e9b16b.netlify.app/images/IG_Sonny.jpeg"
          title='me'
          onClick={logoutOfApp}
        />
      </div>
    </div>
  );
}

export default Header