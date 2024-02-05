import { Outlet } from "react-router-dom";
import { UserMenu, Navigation } from "components";
import { selectAuthIsLoggedIn } from "../../redux/auth/authSlice.selectors";
import { useSelector } from "react-redux";

export const Layout = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <div>
      <header style={{display:'flex', alignItems:'center'}}>
        <Navigation />
        {isLoggedIn && <UserMenu/>}
          
      </header>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  )
}