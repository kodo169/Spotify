import React, { useEffect,useState,useRef } from 'react'
import styled from './StyledSpotify.module.scss'
import clsx from 'clsx'
import SidebarSpotify from './SidebarSpotify'
import NavbarSpotify from './NavbarSpotify'
import BodySpotify from './BodySpotify'
import FooterSporify from './FooterSporify'
import {useStateProvider} from '../utils/StateProvider'
import { reducerCases } from '../utils/Contants';


export default function MainSpotify() {
  const [{token}, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground,setNavBackground] = useState(false);
  const [headerBackground,setHeaderBackground] = useState(false);
  const bodyScrolled = () =>{
    bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false)
    bodyRef.current.scrollTop >= 20 ? setHeaderBackground(true) : setHeaderBackground(false)
  }
  
  useEffect(() => {
    const getDataUser = async () => {
      if (token) {
        try {
          const url = 'https://api.spotify.com/v1/me';
          const response = await fetch(url,{
            headers: {
              Authorization: `Bearer ${token}`
            },
          })

          if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
          }

          const data = await response.json();
          const userInfor = {
            userId : data.id,
            userName : data.display_name,
          }
          dispatch({type : reducerCases.SET_USER,userInfor})
        } catch (error) {
          console.error('Error fetching playlist data:', error.response || error.message);
        }
      }
    }
    getDataUser();
  },[dispatch, token]);

  return (
    <div className={clsx(styled.container)}>
      <div className={clsx(styled.spotify__body)}>
        <SidebarSpotify />
        <div className={clsx(styled.body)} ref={bodyRef} onScroll={bodyScrolled}>
            <NavbarSpotify navBackground={navBackground}/>
          <div className={clsx(styled.body__contents)}>
            <BodySpotify headerBackground ={headerBackground}/>
          </div>
        </div>
      </div>
      <div className= {clsx(styled.spotify__footer)}>
            <FooterSporify/>
      </div>
    </div>
  )
}
