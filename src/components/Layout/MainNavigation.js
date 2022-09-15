import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {RiLogoutBoxRLine} from 'react-icons/ri'
import AuthContext from '../../store/auth-context'
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Каналсервис</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn && (
            <Link to='/'>
            <li>
              <div className={classes.logout} onClick={logoutHandler}>
                 <div className={classes.userName}>Username</div>
                 <RiLogoutBoxRLine/>
              </div>
            </li>
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
