import React, { useState } from 'react'
import style from './StyledNavbar.module.scss'
import clsx from 'clsx'
import {FaSearch} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import {useStateProvider} from '../utils/StateProvider'
import axios from 'axios';

export default function NavbarSpotify({navBackground}) {
  const [{ userInfor , token}, dispatch] = useStateProvider();
  const [keyword, setKeyword] = useState('');
  const sreach = (nameSreach) => {
    setKeyword(nameSreach);
    handleSreach(nameSreach);
  }
  const handleSreach = async () =>{
    if (token) {
      try {
        const url = `https://api.spotify.com/v1/search?q=${keyword}&type=track`;

        const response = await axios.get(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response.data)
        // if(response.data !== ""){
        //   const {item} = response.data;
        //   const currentPlaying = {
        //       id : item.id,
        //       name : item.name,
        //       arrtists : item.artists.map((artist) =>artist.name),
        //       image : item.album.images[2].url,
        //   }
        //   dispatch({type: reducerCases.SET_CURRENT_SONG,currentPlaying})
        // }
        
        }catch (error) {
        console.error('Error Search music data:', error.response || error.message);
      }
    }
  }
  return (
    <div
      className={clsx(style.container, {
        [style.navBackground]: navBackground,
      })}
    >
      <div className={clsx(style.searchBar)}>
        <FaSearch />
        <input value={keyword} onChange={e => sreach(e.target.value)}  type="text" placeholder="What do u want to play??" />
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
