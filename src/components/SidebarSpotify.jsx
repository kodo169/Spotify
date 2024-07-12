import React from 'react'
import clsx from 'clsx'
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled, MdSearch} from 'react-icons/md'
import styled from './StyledSidebar.module.scss'
import PlayList from './PlayList'

export default function SidebarSpotify() {
  return (
    <div className={clsx(styled.container)}>
      <div className={clsx(styled.toplink)}>
        <div className= {clsx(styled.logo)}>
          <img src='https://logosmarcas.net/wp-content/uploads/2020/09/Spotify-Logo.png' alt='Kodo Music' />
        </div>
        <ul>
          <li>
            <IoLibrary/>
            <span>Home</span>
          </li>
          <li>
            <MdHomeFilled/>
            <span>Search</span>
          </li>
          <li>
            <MdSearch />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <PlayList/>
    </div>
  )
}
