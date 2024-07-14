import React from 'react'
import style from './StyledNavbar.module.scss'
import clsx from 'clsx'
import {FaSearch} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import {useStateProvider} from '../utils/StateProvider'


export default function NavbarSpotify({navBackground}) {
  console.log(navBackground)
  const [{ userInfor }, dispatch] = useStateProvider();
  return (
    <div
      className={clsx(style.container, {
        [style.navBackground]: navBackground,
      })}
    >
      <div className={clsx(style.searchBar)}>
        <FaSearch />
        <input type="text" placeholder="What do u want to play??" />
      </div>
      <div className={clsx(style.avatar)}>
        <a href="#">
          <CgProfile />
          <span>{userInfor?.userName}</span>
        </a>
      </div>
    </div>
  )
}
