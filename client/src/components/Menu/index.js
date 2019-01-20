import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => (
  <nav
    className='menu'
  >
    <Link className='bigButton bigButton--left' to='/' title='Back to map' alt='Back to map'>
      <svg className='bigButton__icon'>
        <use href='icons/sprite.svg#backArrow' />
      </svg>
    </Link>
    <NavLink className='menu__link' to='/about'>About</NavLink>
    <NavLink className='menu__link' to='/credits'>Credits</NavLink>
    <a
      className='menu__link'
      href='https://github.com/sivakusayan/Natural-Events-Visualizer'
      target='_blank'
      rel='noopener noreferrer'
    >
      Github
    </a>
  </nav>
);

export default Menu;
