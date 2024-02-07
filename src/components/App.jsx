// import { ContactForm, ContactList, Section, Filter } from 'components';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiRefreshUser } from '../redux/auth/authSlice';
import { RestrictedRoute, Layout, PrivateRoute } from 'components';

// import NotFoundPage from 'Pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(() => import('../Pages/HomePage/HomePage'))
const RegisterPage = lazy(() => import('../Pages/RegisterPage/RegisterPage'))
const LoginPage = lazy(() => import('../Pages/LoginPage/LoginPage'))
const ContactsPage = lazy(() => import('../Pages/ContactsPage/ContactsPage'))
const NotFoundPage = lazy(()=> import ('../Pages/NotFoundPage/NotFoundPage'))

export const App = () => {   
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch])

  return (
        <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<HomePage/>} />
          <Route path="contacts" element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>      
          } />
          <Route path="register" element={
            <RestrictedRoute>
              <RegisterPage />
            </RestrictedRoute>
          } />
          <Route path="login" element={
            <RestrictedRoute>
              <LoginPage/>
            </RestrictedRoute>
          } />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        </Suspense>
      
    )
};