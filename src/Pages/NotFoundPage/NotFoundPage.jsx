import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.text}>Sorry, but page you are looking for is not found, try again later, or come back to <NavLink to="/"> Homepage</NavLink> </h2>   
    </div>
  )
}

export default NotFoundPage;