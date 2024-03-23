/* eslint-disable no-undef */
import React, { useContext } from 'react';
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { AppContext } from '../../context/Context';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const Layout = () => {
  const { toggleTheme, theme } = useContext(AppContext);
  return (
    <div className='root-layout card-body'>
      {/* <ScrollRestoration /> */}
      <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'navlink-active' : 'text-color';
            }}
            to='/'
          >
            Home
          </NavLink>
          <NavLink className={'text-color'} to='about'>
            About
          </NavLink>
          <button
            onClick={() => {
              toggleTheme();
            }}
          >
            {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
