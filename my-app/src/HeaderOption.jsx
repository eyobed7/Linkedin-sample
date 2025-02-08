import React from 'react'
import './HeaderOption.css'

import Avatar from '@mui/material/Avatar'
function HeaderOption({avatar,Icon,title,onClick }) {
  return (
    <div onClick={onClick} className='headerOption'>
        {Icon && <Icon className='headerOption_icon'/>}
        {avatar && <Avatar className='headerOption_icon' src={avatar}/> }
        <h3 className=''>{title}</h3>
    
    </div>
  )
}

export default HeaderOption