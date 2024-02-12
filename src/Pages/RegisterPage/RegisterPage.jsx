import React from 'react'
import { useDispatch } from 'react-redux';
import { apiRegisterUser } from '../../redux/auth/authSlice';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './RegisterPage.module.css'

const Register = () => {
  const dispatch = useDispatch();
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
    <div className={css.container}>
      <h1 className={css.sectionName}>Register Page</h1>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.inputContainer}>
          <label htmlFor='userName' className={css.label}>Name</label>
          <input
            className={css.input}
            id='userName'
            type='text'
            name='userName'
            placeholder='John'
            minLength={2}
            required>
          </input>
        </div>
        <div className={css.inputContainer}>
          <label htmlFor='email' className={css.label}>Email</label>
          <input
            className={css.input}
            id='email'
            type='email'
            name='userEmail'
            placeholder='youremail@mail.com'
            required>
          </input>
        </div>
        <div className={css.inputContainer}>
          <label htmlFor='password' className={css.label}>Password</label>
          <input
            className={css.input}
            id='password'
            type='password'
            name='userPassword'
            minLength={7}
            required>
          </input>
        </div>

        <button className={css.button} type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Register
