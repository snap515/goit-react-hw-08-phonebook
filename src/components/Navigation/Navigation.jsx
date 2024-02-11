import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors'
import css from './Navigation.module.css'

function activeLinkStyle({isActive}) {
  return `${css.navLink} ${isActive ? css.active : ''}`
}

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <>
      
      {isLoggedIn ?
        <div className={css.navList}>
          <NavLink className={activeLinkStyle} to="/">Home</NavLink>
          <NavLink className={activeLinkStyle} to="/contacts">Contacts</NavLink>
        </div>
        :
        <div className={`${css.navList} ${css.notLoggedIn}`} >
          <NavLink className={activeLinkStyle} to="/">Home</NavLink>
          <div className={css.authCover}>
            <NavLink className={activeLinkStyle} to="/login">Login</NavLink>
            <NavLink className={activeLinkStyle} to="/register">Register</NavLink>
          </div>
        </div>
        
      }
    </>
  )
}

export default Navigation;
