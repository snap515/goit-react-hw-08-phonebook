import React from 'react'
import { useDispatch } from 'react-redux';
import { apiLoginUser } from '../../redux/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = {email, password}

    dispatch(apiLoginUser(formData));
  }



  return (
    <div>
      <h1>Login Page</h1>
      <form action="" onSubmit={onSubmit}>
        
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
        <button type='submit'>Sign in</button>
      </form>
    </div>
  )
}

export default Login;