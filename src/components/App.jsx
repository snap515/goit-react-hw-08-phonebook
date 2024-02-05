// import { ContactForm, ContactList, Section, Filter } from 'components';
import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { useDispatch } from 'react-redux';
import { apiRefreshUser } from '../redux/auth/authSlice';

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
            <Route path="contacts" element={<Contacts />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />}/>
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