import React from 'react'
import { useDispatch} from 'react-redux';
import { apiLoginUser } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <>
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
      {/* {error &&  toast.error(error)} */}
    </>
  )
}

export default Login;