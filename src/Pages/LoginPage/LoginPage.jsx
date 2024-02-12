import React from 'react'
import { useDispatch} from 'react-redux';
import { apiLoginUser } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './LoginPage.module.css'

const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;
    const formData = {email, password}

    dispatch(apiLoginUser(formData))
      .unwrap()
      .catch(() => {
        toast.error(`Something went wrong. Login or password is incorrect.`);
      });
  }

  return (
    <div className={css.container}>
      <h1 className={css.sectionName}>Login Page</h1>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.inputContainer}>
          <label htmlFor='email' className={css.label}>
          Email
        </label>
        <input
          id='email'
          type='email'
          name='userEmail'
          placeholder='youremail@mail.com'
          className={css.input}
          required>
          </input>
        </div>
        
        <div className={css.inputContainer}>
          <label htmlFor='password' className={css.label}>
          Password
        </label>
        <input
          id='password'
          type='password'
          name='userPassword'
          minLength={7}
          className={css.input}
          required>
          </input>
        </div>
        
        <button className={css.button} type='submit'>Sign in</button>
      </form>
      {/* {error &&  toast.error(error)} */}
    </div>
  )
}

export default Login;