import React, { useEffect, useState } from 'react'
import style from './StyledNavbar.module.scss'
import clsx from 'clsx'
import {FaSearch} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import {useStateProvider} from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/Contants';
import SearchResultsModal from './SearchResultsModal';

export default function NavbarSpotify({navBackground}) {
  const [{ userInfor , token}, dispatch] = useStateProvider();
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sreach = (nameSreach) => {
    setKeyword(nameSreach);
    handleSreach();
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
          const data = response.data;
          const items = data.tracks.items
          console.log(items);
          setIsModalOpen(true); 
          // const playlist = items.map(({name , id,images}) => {
          //   return {name,id,imageUrl: images[0].url};
          // });
          // const selectPlaylist = {
          //   id: data.id,
          //   name: data.name,
          //   describe : data.description,
          //   image : data.images[0].url,
          //   owner_name : data.owner.display_name,
          //   tracks: data.tracks.items.map((track) => ({
          //     id: track.track.id,
          //     name: track.track.name,
          //     artists : track.track.artists.map((artists)=> artists.name),
          //     image : track.track.album.images[2].url,
          //     duration : track.track.duration_ms,
          //     album: track.track.album.name,
          //     context_uri : track.track.uri,
          //     track_number : track.track.track_number
          //   })),
          // }
          // dispatch({type: reducerCases.SET_PLAYLIST,playlist})
          // dispatch({type: reducerCases.SELECT_PLAYLIST,selectPlaylist});          
          }catch (error) {
          console.error('Error Search music data:', error.response || error.message);
        }
      }
    }
    handleSreach();

  return (
    <div>
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
    <div>
          <SearchResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={searchResults}
        />
    </div>
    </div>
  )
}
