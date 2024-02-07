import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { apiRegisterUser } from '../../redux/auth/authSlice';
import { selectAuthError } from '../../redux/auth/authSlice.selectors';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError)
  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = {name, email, password}

    dispatch(apiRegisterUser(formData)).unwrap()
      .catch(() => {
        toast.error(`"${name}" is already in use.`);
      });;
  }



  return (
    <div>
      <h1>Register Page</h1>
      <form action="" onSubmit={onSubmit}>
        <label>
          Name
        <input
          type='text'
          name='userName'
          placeholder='John'
          minLength={2}
          required>
          </input>
        </label>
        
        
        <label>
          Email
          <input
          type='email'
          name='userEmail'
          placeholder='youremail@mail.com'
          required>
          </input>
        </label>
        
        <label>
          Password
          <input
          type='password'
          name='userPassword'
          placeholder='********'
          minLength={7}
          required>
          </input>
        </label>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Register
