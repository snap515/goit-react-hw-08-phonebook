// import { ContactForm, ContactList, Section, Filter } from 'components';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiRefreshUser } from '../redux/auth/authSlice';
import { RestrictedRoute, Layout, PrivateRoute } from 'components';

const Home = lazy(() => import('../Pages/Home/Home'))
const Register = lazy(() => import('../Pages/Register/Register'))
const Login = lazy(() => import('../Pages/Login/Login'))
const Contacts = lazy(() => import('../Pages/Contacts/Contacts'))

export const App = () => {   
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch])

  return (
        <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<Home/>} />
          <Route path="contacts" element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
            
          } />
          <Route path="register" element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          } />
          <Route path="login" element={
            <RestrictedRoute>
              <Login/>
            </RestrictedRoute>
          } />
          </Route>
            
          </Routes>
        

          {/* <Section title="Phonebook">
            <ContactForm/>
          </Section>
          <Section title="Contacts">
            <Filter/>
            <ContactList/>
          </Section> */}
        </Suspense>
      
    )
};