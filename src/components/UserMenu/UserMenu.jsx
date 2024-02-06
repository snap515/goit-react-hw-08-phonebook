import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  apiLogoutUser } from '../../redux/auth/authSlice';
import { selectAuthIsLoading, selectAuthUserData } from '../../redux/auth/authSlice.selectors';

const UserMenu = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectAuthUserData)
  const isLoading = useSelector(selectAuthIsLoading)

  const userEmail = userData?.email ?? "Couldn't get user email";

  const handleLogout = () => {
    dispatch(apiLogoutUser())
  }
  return (
    <div>
      <p>{userEmail}</p>
      <button type='button' disabled={isLoading} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserMenu;