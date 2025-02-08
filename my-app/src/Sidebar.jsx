import React from 'react';
import './Sidebar.css';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
export default function Sidebar() {
  const user=useSelector(selectUser);
    const recentItem=(topic)=>{
        return (
            <div className="sidebar_recentItem">
                <span className="sidebar_hash">#</span>
                <p>{topic}</p>
            </div>
        );
    }
  return (
    <div className="sidebar">
      {/* Top Section */}
      <div className="sidebar_top">
      <img src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MjA3fDB8MHxleHBsb3JILWZIZWR8MMXx8fGVufDB8fHw%3D&w=1000&q=80'/>
        <Avatar className="sidebar_avatar" alt="Profile" >{user.email[0]}</Avatar>
        <div className="sidebar_userInfo">
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
      </div>
      {/* Stats Section */}
      <div className="sidebar_stats">
        <div className="sidebar_stat">
          <p>Who viewed you</p>
          <p className="sidebar_statNumber">10,456</p>
        </div>
        <div className="sidebar_stat">
          <p>Views on post</p>
          <p className="sidebar_statNumber">14,566</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="sidebar_bottom">
        <p>Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('softwareengineering')}
        {recentItem('design')}
        {recentItem('developer')}
      </div>
    </div>
  );
}