import { Outlet } from "react-router-dom";
import { UserMenu, Navigation } from "components";
import { selectAuthIsLoggedIn } from "../../redux/auth/authSlice.selectors";
import { useSelector } from "react-redux";
import css from './Layout.module.css'

const headerIsLoggedIn = isLoggedIn =>
  `${css.header} ${isLoggedIn ? css.headerIsLoggedIn : ''}`

export const Layout = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <div className='container'>
      <header className={headerIsLoggedIn(isLoggedIn)}>
        <Navigation />
        {isLoggedIn && <UserMenu/>}
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        <p></p>
      </footer>
    </div>
  )
}