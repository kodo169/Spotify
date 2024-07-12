import React from 'react'
import styled from './StyledSpotify.module.scss'
import clsx from 'clsx'
import SidebarSpotify from './SidebarSpotify'
import NavbarSpotify from './NavbarSpotify'
import BodySpotify from './BodySpotify'
import FooterSporify from './FooterSporify'

export default function mainSpotify() {
  return (
    <div className={clsx(styled.container)}>
      <div className={clsx(styled.spotify__body)}>
        <SidebarSpotify />
        <div className={clsx(styled.body)}>
          <NavbarSpotify />
          <div className={clsx(styled.body__contents)}>
            <BodySpotify />
          </div>
        </div>
      </div>
      <div className= {clsx(styled.spotify__footer)}>
            <FooterSporify/>
      </div>
    </div>
  )
}
